import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsUUID } from 'class-validator';
import { AdminRole } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { CONTENT_ROLES, Roles } from '../decorators/auth.decorators';
import { slugify } from '../utils';
import { VALIDATION_OPTIONS } from '../validation';

export class ReorderDto {
  @IsArray()
  @ArrayMaxSize(500)
  @IsUUID('all', { each: true })
  ids!: string[];
}

/** Minimal shape shared by Prisma model delegates. */
interface Delegate {
  findMany(args?: object): Promise<unknown[]>;
  findUniqueOrThrow(args: object): Promise<unknown>;
  create(args: object): Promise<unknown>;
  update(args: object): Promise<unknown>;
  delete(args: object): Promise<unknown>;
}

type ModelName =
  | 'socialLink'
  | 'siteStat'
  | 'heroSlide'
  | 'pageSection'
  | 'branch'
  | 'serviceTime'
  | 'leader'
  | 'department'
  | 'givingMethod';

export interface AdminCrudOptions {
  /** URL segment under /admin, e.g. "branches" */
  path: string;
  /** Swagger tag + controller name stem, e.g. "Branches" */
  name: string;
  model: ModelName;
  createDto: Type<object>;
  updateDto: Type<object>;
  roles?: AdminRole[];
  /** Field to derive `slug` from when the client doesn't send one. */
  slugFrom?: string;
  include?: object;
}

/**
 * Builds a standard admin controller (list / get / create / update / delete /
 * reorder) for simple content tables. Anything with real business rules
 * (events, store, orders, ...) has its own hand-written module instead.
 */
export function createAdminCrudController(
  opts: AdminCrudOptions,
): Type<unknown> {
  const createPipe = new ValidationPipe({
    ...VALIDATION_OPTIONS,
    expectedType: opts.createDto,
  });
  const updatePipe = new ValidationPipe({
    ...VALIDATION_OPTIONS,
    expectedType: opts.updateDto,
  });
  const reorderPipe = new ValidationPipe({
    ...VALIDATION_OPTIONS,
    expectedType: ReorderDto,
  });

  const withSlug = (body: Record<string, unknown>) => {
    if (!opts.slugFrom || body.slug || !body[opts.slugFrom]) return body;
    return { ...body, slug: slugify(String(body[opts.slugFrom])) };
  };

  @ApiTags(`Admin · ${opts.name}`)
  @ApiBearerAuth()
  @Roles(...(opts.roles ?? CONTENT_ROLES))
  @Controller(`admin/${opts.path}`)
  class AdminCrudController {
    constructor(
      @Inject(PrismaService) private readonly prisma: PrismaService,
    ) {}

    private get repo(): Delegate {
      return this.prisma[opts.model];
    }

    @Get()
    findAll() {
      return this.repo.findMany({
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        include: opts.include,
      });
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.repo.findUniqueOrThrow({
        where: { id },
        include: opts.include,
      });
    }

    @Post()
    @ApiBody({ type: opts.createDto })
    create(@Body(createPipe) body: Record<string, unknown>) {
      return this.repo.create({ data: withSlug(body) });
    }

    @Patch('reorder')
    @HttpCode(204)
    @ApiBody({ type: ReorderDto })
    async reorder(@Body(reorderPipe) { ids }: ReorderDto) {
      await this.prisma.$transaction(
        ids.map(
          (id, index) =>
            this.repo.update({
              where: { id },
              data: { sortOrder: index },
            }) as never,
        ),
      );
    }

    @Patch(':id')
    @ApiBody({ type: opts.updateDto })
    update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(updatePipe) body: Record<string, unknown>,
    ) {
      return this.repo.update({ where: { id }, data: body });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
      await this.repo.delete({ where: { id } });
    }
  }

  // Distinct class names keep Swagger operationIds unique.
  Object.defineProperty(AdminCrudController, 'name', {
    value: `Admin${opts.name.replace(/\W/g, '')}Controller`,
  });
  return AdminCrudController;
}
