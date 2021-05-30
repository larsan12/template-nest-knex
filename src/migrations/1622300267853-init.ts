import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE users (
            id             uuid NOT NULL DEFAULT uuid_generate_v4(),
            email          character varying NOT NULL,
            CONSTRAINT UQ_97672ac88f789774dd47f7c8be3 UNIQUE (email),
            CONSTRAINT PK_a3ffb1c0c8416b9fc6f907b7433 PRIMARY KEY (id)
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`DROP TABLE "users"`);
}
