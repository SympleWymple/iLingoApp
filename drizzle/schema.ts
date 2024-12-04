import { pgTable, serial, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const courses = pgTable("courses", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	imageSrc: text("image_src").notNull(),
});
