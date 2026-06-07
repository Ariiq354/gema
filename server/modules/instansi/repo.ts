import type { PaginationSearchSchema } from "~~/server/utils/schema";
import type { CreateInstansiSchema } from "./model";
import { desc, eq, ilike, inArray } from "drizzle-orm";
import { db } from "~~/server/database";
import { instansiTable } from "~~/server/database/schema/instansi";

export abstract class InstansiRepo {
  static async create(payload: CreateInstansiSchema) {
    await db.insert(instansiTable).values(payload);
  };

  static async findAll(query: PaginationSearchSchema, isActive?: boolean) {
    const offset = (query.page - 1) * query.limit;

    const qb = db.select({
      id: instansiTable.id,
      nama: instansiTable.nama,
      isActive: instansiTable.isActive,
    }).from(instansiTable).orderBy(desc(instansiTable.id));

    if (query.search) {
      qb.where(ilike(instansiTable.nama, `%${query.search}%`));
    }

    if (isActive !== undefined) {
      qb.where(eq(instansiTable.isActive, isActive));
    }

    const total = await db.$count(qb);
    const data = await qb.limit(query.limit).offset(offset);

    return { total, data };
  }

  static async update(id: number, payload: CreateInstansiSchema) {
    return await db.update(instansiTable).set(payload).where(eq(instansiTable.id, id)).returning();
  }

  static async delete(ids: number[]) {
    return await db.delete(instansiTable).where(inArray(instansiTable.id, ids)).returning();
  }
}
