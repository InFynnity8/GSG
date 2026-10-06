import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Module,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CONTENT_ROLES,
  Public,
  Roles,
} from '../common/decorators/auth.decorators';
import {
  CreateBookDto,
  CreateMerchandiseDto,
  ProductQueryDto,
  UpdateBookDto,
  UpdateMerchandiseDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';

// ── Public ──────────────────────────────────────────────────────────────────

@ApiTags('Public · Store')
@Public()
@Controller('store')
export class StoreController {
  constructor(private readonly products: ProductsService) {}

  @Get('books')
  books(@Query() query: ProductQueryDto) {
    return this.products.list('book', query);
  }

  @Get('books/categories')
  bookCategories() {
    return this.products.categories('book');
  }

  @Get('books/:idOrSlug')
  book(@Param('idOrSlug') idOrSlug: string) {
    return this.products.findPublic('book', idOrSlug);
  }

  @Get('merchandise')
  merchandise(@Query() query: ProductQueryDto) {
    return this.products.list('merchandise', query);
  }

  @Get('merchandise/categories')
  merchandiseCategories() {
    return this.products.categories('merchandise');
  }

  @Get('merchandise/:idOrSlug')
  merchandiseItem(@Param('idOrSlug') idOrSlug: string) {
    return this.products.findPublic('merchandise', idOrSlug);
  }
}

// ── Admin ───────────────────────────────────────────────────────────────────

@ApiTags('Admin · Books')
@ApiBearerAuth()
@Roles(...CONTENT_ROLES)
@Controller('admin/books')
export class AdminBooksController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ProductQueryDto) {
    return this.products.list('book', query, { includeDrafts: true });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.products.findOne('book', id);
  }

  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.products.create('book', dto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBookDto) {
    return this.products.update('book', id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.products.remove('book', id);
  }
}

@ApiTags('Admin · Merchandise')
@ApiBearerAuth()
@Roles(...CONTENT_ROLES)
@Controller('admin/merchandise')
export class AdminMerchandiseController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ProductQueryDto) {
    return this.products.list('merchandise', query, { includeDrafts: true });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.products.findOne('merchandise', id);
  }

  @Post()
  create(@Body() dto: CreateMerchandiseDto) {
    return this.products.create('merchandise', dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMerchandiseDto,
  ) {
    return this.products.update('merchandise', id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.products.remove('merchandise', id);
  }
}

@Module({
  controllers: [
    StoreController,
    AdminBooksController,
    AdminMerchandiseController,
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class StoreModule {}
