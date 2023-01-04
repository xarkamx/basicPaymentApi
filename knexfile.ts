import type { Knex } from "knex";

// Update with your config settings.

const config: Record<string, Knex.Config> = {
  development: {
    client: "mysql",
    connection: {
      database: "codermx_bpa",
      user: "codermx_admin",
      password: "Una pass segura",
      host: "216.246.112.194",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
