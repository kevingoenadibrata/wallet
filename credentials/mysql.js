import knex from "knex";

export const client = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "nodeuser",
    password: "password123",
    database: "wallet",
  },
});
