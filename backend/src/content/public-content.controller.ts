import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Public } from '../common/decorators/auth.decorators';
import { LeaderGroup, PageSectionType } from '../generated/prisma/enums';
import { PrismaService } from '../prisma/prisma.service';
import { SettingsService } from '../settings/settings.service';

class LeaderQuery {
  @IsOptional() @IsEnum(LeaderGroup) group?: LeaderGroup;
}
class SectionQuery {
  @IsOptional() @IsEnum(PageSectionType) type?: PageSectionType;
}

const bySortOrder = [
  { sortOrder: 'asc' as const },
  { createdAt: 'asc' as const },
];

/** Read-only content consumed by the public website. */
@ApiTags('Public · Content')
@Public()
@Controller()
export class PublicContentController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: SettingsService,
  ) {}

  /** Everything the layout (navbar, footer, home) needs, in one request. */
  @Get('site')
  async site() {
    const [settings, socialLinks, stats] = await Promise.all([
      this.settings.get(),
      this.prisma.socialLink.findMany({
        where: { isActive: true },
        orderBy: bySortOrder,
      }),
      this.prisma.siteStat.findMany({
        where: { isActive: true },
        orderBy: bySortOrder,
      }),
    ]);
    return { settings, socialLinks, stats };
  }

  @Get('hero-slides')
  heroSlides() {
    return this.prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: bySortOrder,
    });
  }

  @Get('page-sections')
  @ApiQuery({ name: 'type', enum: PageSectionType, required: false })
  pageSections(@Query() { type }: SectionQuery) {
    return this.prisma.pageSection.findMany({
      where: { isPublished: true, ...(type ? { type } : {}) },
      orderBy: bySortOrder,
    });
  }

  @Get('branches')
  branches() {
    return this.prisma.branch.findMany({
      where: { isPublished: true },
      orderBy: [{ isHeadquarters: 'desc' }, ...bySortOrder],
      include: {
        serviceTimes: { where: { isActive: true }, orderBy: bySortOrder },
      },
    });
  }

  @Get('branches/:slug')
  branch(@Param('slug') slug: string) {
    return this.prisma.branch.findFirstOrThrow({
      where: { slug, isPublished: true },
      include: {
        serviceTimes: { where: { isActive: true }, orderBy: bySortOrder },
      },
    });
  }

  @Get('service-times')
  serviceTimes() {
    return this.prisma.serviceTime.findMany({
      where: { isActive: true },
      orderBy: bySortOrder,
      include: { branch: { select: { id: true, name: true, slug: true } } },
    });
  }

  @Get('leaders')
  @ApiQuery({ name: 'group', enum: LeaderGroup, required: false })
  leaders(@Query() { group }: LeaderQuery) {
    return this.prisma.leader.findMany({
      where: { isPublished: true, ...(group ? { group } : {}) },
      orderBy: bySortOrder,
    });
  }

  @Get('departments')
  departments() {
    return this.prisma.department.findMany({
      where: { isPublished: true },
      orderBy: bySortOrder,
    });
  }

  @Get('giving-methods')
  givingMethods() {
    return this.prisma.givingMethod.findMany({
      where: { isActive: true },
      orderBy: bySortOrder,
    });
  }
}
