import { Injectable } from '@nestjs/common';
import { pageArgs, paginated } from '../common/dto/pagination.dto';
import { toNumber, uniqueSlug } from '../common/utils';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product.dto';

export type ProductKind = 'book' | 'merchandise';

interface ProductDelegate {
  findMany(args: object): Promise<ProductRow[]>;
  findFirstOrThrow(args: object): Promise<ProductRow>;
  findUniqueOrThrow(args: object): Promise<ProductRow>;
  count(args: object): Promise<number>;
  create(args: object): Promise<ProductRow>;
  update(args: object): Promise<ProductRow>;
  delete(args: object): Promise<unknown>;
}
interface ProductRow {
  price: { toString(): string };
  [key: string]: unknown;
}

const SEARCH_FIELDS: Record<ProductKind, string[]> = {
  book: ['title', 'description', 'author'],
  merchandise: ['title', 'description'],
};

const SORTS = {
  newest: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  'price-asc': [{ price: 'asc' }],
  'price-desc': [{ price: 'desc' }],
  title: [{ title: 'asc' }],
};

/** Prisma Decimal -> number so the website can call price.toFixed(2). */
export const serializeProduct = (row: ProductRow) => ({
  ...row,
  price: toNumber(row.price),
});

/** Shared logic for books and merchandise (same shape, different tables). */
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private repo(kind: ProductKind): ProductDelegate {
    return this.prisma[kind];
  }

  async list(
    kind: ProductKind,
    query: ProductQueryDto,
    opts: { includeDrafts?: boolean } = {},
  ) {
    const where = {
      ...(opts.includeDrafts ? {} : { isPublished: true }),
      ...(query.category
        ? { category: { equals: query.category, mode: 'insensitive' } }
        : {}),
      ...(query.maxPrice !== undefined
        ? { price: { lte: query.maxPrice } }
        : {}),
      ...(query.search
        ? {
            OR: SEARCH_FIELDS[kind].map((field) => ({
              [field]: { contains: query.search, mode: 'insensitive' },
            })),
          }
        : {}),
    };
    const [rows, total] = await Promise.all([
      this.repo(kind).findMany({
        where,
        orderBy: SORTS[query.sort],
        ...pageArgs(query),
      }),
      this.repo(kind).count({ where }),
    ]);
    return paginated(rows.map(serializeProduct), total, query);
  }

  async categories(kind: ProductKind) {
    const rows = await this.repo(kind).findMany({
      // book.category is nullable; merchandise.category is required
      where: {
        isPublished: true,
        ...(kind === 'book' ? { category: { not: null } } : {}),
      },
      distinct: ['category'],
      select: { category: true },
      orderBy: { category: 'asc' },
    });
    return rows.map((r) => r.category as string);
  }

  async findPublic(kind: ProductKind, idOrSlug: string) {
    const isUuid = /^[0-9a-f-]{36}$/i.test(idOrSlug);
    return serializeProduct(
      await this.repo(kind).findFirstOrThrow({
        where: {
          isPublished: true,
          ...(isUuid ? { id: idOrSlug } : { slug: idOrSlug }),
        },
      }),
    );
  }

  async findOne(kind: ProductKind, id: string) {
    return serializeProduct(
      await this.repo(kind).findUniqueOrThrow({ where: { id } }),
    );
  }

  async create(kind: ProductKind, dto: { title: string; slug?: string }) {
    return serializeProduct(
      await this.repo(kind).create({
        data: { ...dto, slug: dto.slug ?? uniqueSlug(dto.title) },
      }),
    );
  }

  async update(kind: ProductKind, id: string, dto: object) {
    return serializeProduct(
      await this.repo(kind).update({ where: { id }, data: dto }),
    );
  }

  async remove(kind: ProductKind, id: string) {
    await this.repo(kind).delete({ where: { id } });
  }
}
