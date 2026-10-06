import { Module } from '@nestjs/common';
import { createAdminCrudController } from '../common/crud/admin-crud.factory';
import * as dto from './dto/content.dto';
import { PublicContentController } from './public-content.controller';

const adminControllers = [
  createAdminCrudController({
    path: 'social-links',
    name: 'Social links',
    model: 'socialLink',
    createDto: dto.CreateSocialLinkDto,
    updateDto: dto.UpdateSocialLinkDto,
  }),
  createAdminCrudController({
    path: 'stats',
    name: 'Stats',
    model: 'siteStat',
    createDto: dto.CreateSiteStatDto,
    updateDto: dto.UpdateSiteStatDto,
  }),
  createAdminCrudController({
    path: 'hero-slides',
    name: 'Hero slides',
    model: 'heroSlide',
    createDto: dto.CreateHeroSlideDto,
    updateDto: dto.UpdateHeroSlideDto,
  }),
  createAdminCrudController({
    path: 'page-sections',
    name: 'Page sections',
    model: 'pageSection',
    createDto: dto.CreatePageSectionDto,
    updateDto: dto.UpdatePageSectionDto,
  }),
  createAdminCrudController({
    path: 'branches',
    name: 'Branches',
    model: 'branch',
    createDto: dto.CreateBranchDto,
    updateDto: dto.UpdateBranchDto,
    slugFrom: 'name',
    include: { serviceTimes: { orderBy: { sortOrder: 'asc' } } },
  }),
  createAdminCrudController({
    path: 'service-times',
    name: 'Service times',
    model: 'serviceTime',
    createDto: dto.CreateServiceTimeDto,
    updateDto: dto.UpdateServiceTimeDto,
  }),
  createAdminCrudController({
    path: 'leaders',
    name: 'Leaders',
    model: 'leader',
    createDto: dto.CreateLeaderDto,
    updateDto: dto.UpdateLeaderDto,
  }),
  createAdminCrudController({
    path: 'departments',
    name: 'Departments',
    model: 'department',
    createDto: dto.CreateDepartmentDto,
    updateDto: dto.UpdateDepartmentDto,
    slugFrom: 'name',
  }),
  createAdminCrudController({
    path: 'giving-methods',
    name: 'Giving methods',
    model: 'givingMethod',
    createDto: dto.CreateGivingMethodDto,
    updateDto: dto.UpdateGivingMethodDto,
  }),
];

@Module({
  controllers: [PublicContentController, ...adminControllers],
})
export class ContentModule {}
