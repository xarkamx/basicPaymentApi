import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("api_keys", (table) => {
    table.increments("id").primary();
    table.string("provider").notNullable();
    table.string("value").notNullable();
    table.string("type").notNullable();
    table.string("email").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("api_keys");
}
