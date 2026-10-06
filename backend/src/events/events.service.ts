import { Injectable } from '@nestjs/common';
import { pageArgs, paginated } from '../common/dto/pagination.dto';
import {
  fromDateOnly,
  toDateOnly,
  todayUtc,
  uniqueSlug,
} from '../common/utils';
import { Prisma } from '../generated/prisma/client';
import type { Event } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, EventQueryDto, UpdateEventDto } from './dto/event.dto';

/** Matches the website's EventItem type: date is "YYYY-MM-DD". */
export function serializeEvent(event: Event) {
  return {
    ...event,
    date: toDateOnly(event.date),
    endDate: toDateOnly(event.endDate),
  };
}

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: EventQueryDto, opts: { includeDrafts?: boolean } = {}) {
    const today = todayUtc();
    const where: Prisma.EventWhereInput = {
      ...(opts.includeDrafts ? {} : { isPublished: true }),
      ...(query.upcoming
        ? {
            OR: [{ date: { gte: today } }, { endDate: { gte: today } }],
          }
        : {}),
      ...(query.past ? { date: { lt: today } } : {}),
      ...(query.type
        ? { type: { equals: query.type, mode: 'insensitive' } }
        : {}),
      ...(query.branchId ? { branchId: query.branchId } : {}),
      ...(query.featured !== undefined ? { isFeatured: query.featured } : {}),
      ...(query.search
        ? {
            AND: [
              {
                OR: ['title', 'description', 'type', 'venue'].map((field) => ({
                  [field]: { contains: query.search, mode: 'insensitive' },
                })),
              },
            ],
          }
        : {}),
    };

    const [rows, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where,
        orderBy: [{ date: query.order }, { time: query.order }],
        ...pageArgs(query),
      }),
      this.prisma.event.count({ where }),
    ]);
    return paginated(rows.map(serializeEvent), total, query);
  }

  /** Distinct event types, for the website's filter dropdown. */
  async types() {
    const rows = await this.prisma.event.findMany({
      where: { isPublished: true },
      distinct: ['type'],
      select: { type: true },
      orderBy: { type: 'asc' },
    });
    return rows.map((r) => r.type);
  }

  async findPublic(idOrSlug: string) {
    const isUuid = /^[0-9a-f-]{36}$/i.test(idOrSlug);
    const event = await this.prisma.event.findFirstOrThrow({
      where: {
        isPublished: true,
        ...(isUuid ? { id: idOrSlug } : { slug: idOrSlug }),
      },
      include: { branch: { select: { id: true, name: true, slug: true } } },
    });
    return serializeEvent(event);
  }

  async findOne(id: string) {
    return serializeEvent(
      await this.prisma.event.findUniqueOrThrow({ where: { id } }),
    );
  }

  async create(dto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: {
        ...dto,
        slug: dto.slug ?? uniqueSlug(dto.title),
        date: fromDateOnly(dto.date),
        endDate: dto.endDate ? fromDateOnly(dto.endDate) : null,
      },
    });
    return serializeEvent(event);
  }

  async update(id: string, dto: UpdateEventDto) {
    const { date, endDate, ...rest } = dto;
    const event = await this.prisma.event.update({
      where: { id },
      data: {
        ...rest,
        ...(date ? { date: fromDateOnly(date) } : {}),
        ...(endDate !== undefined
          ? { endDate: endDate ? fromDateOnly(endDate) : null }
          : {}),
      },
    });
    return serializeEvent(event);
  }

  async remove(id: string) {
    await this.prisma.event.delete({ where: { id } });
  }
}
