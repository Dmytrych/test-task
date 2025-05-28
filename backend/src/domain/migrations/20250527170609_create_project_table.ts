import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("projects", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("name").notNullable();
    table.string("ownerLogin").notNullable();
    table.integer("stars").notNullable();
    table.integer("forks").notNullable();
    table.integer("issues").notNullable();
    table.datetime("repositoryCreatedAt").notNullable();
    table.string("url").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("projects");
}
