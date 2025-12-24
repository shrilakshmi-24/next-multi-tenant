import { pgTable, text,varchar ,uuid, date} from "drizzle-orm/pg-core";

export const blogTable = pgTable("blog", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({length:100}).notNull(),
  content: text().notNull(),
  orgId: text().notNull(),
  createdAt:date().notNull().defaultNow(),
});

export type createBlogType = typeof blogTable.$inferInsert;

export type blogType = typeof blogTable.$inferSelect;