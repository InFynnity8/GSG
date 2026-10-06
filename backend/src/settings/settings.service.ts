import { Injectable } from '@nestjs/common';
import { fromDateOnly, toDateOnly } from '../common/utils';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSettingsDto } from './dto/settings.dto';

const SETTINGS_ID = 'default';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const row =
      (await this.prisma.siteSettings.findUnique({
        where: { id: SETTINGS_ID },
      })) ??
      (await this.prisma.siteSettings.upsert({
        where: { id: SETTINGS_ID },
        update: {},
        create: { id: SETTINGS_ID },
      }));
    return { ...row, foundedOn: toDateOnly(row.foundedOn) };
  }

  async update(dto: UpdateSettingsDto) {
    const { foundedOn, ...rest } = dto;
    const data = {
      ...rest,
      ...(foundedOn !== undefined
        ? { foundedOn: foundedOn ? fromDateOnly(foundedOn) : null }
        : {}),
    };
    const row = await this.prisma.siteSettings.upsert({
      where: { id: SETTINGS_ID },
      update: data,
      create: { id: SETTINGS_ID, ...data },
    });
    return { ...row, foundedOn: toDateOnly(row.foundedOn) };
  }
}
