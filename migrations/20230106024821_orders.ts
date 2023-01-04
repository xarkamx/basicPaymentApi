import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("orders", (table) => {
    table.string("id").primary();
    table.string("user_id").notNullable();
    table.string("status").notNullable();
    table.string("provider").notNullable();
    table.integer("total").notNullable();
    table.json("meta_data").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("orders");
}
