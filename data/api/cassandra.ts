import { Client } from 'cassandra-driver'

import { Table } from '../tables'

/*
  Queries:
  - users by userId   - when searching by id
  - users by name     - when searching by name
  - items by ownerId  - when opening profile
  - items by title    - when searching for titles

  users:
  - id
  - name
  - birthDate

  items:
  - id
  - title
  - description
  - price

  */

let client: typeof Client.prototype

export const init = () => {
  client ??= new Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'shop'
  })
}

export const connect = () => client.connect()

export const shutdown = () => client.shutdown()

export const createTable = (name: string, table: string) =>
  client.execute(`CREATE TABLE ${name} ${table};`)

export const dropTable = (tableName: string) =>
  client.execute(`DROP TABLE if exists ${tableName};`)

export const execute = (query: string) => client.execute(query)

async function createAndPopulateTable(table: Table) {
  await dropTable(table.name)
  await createTable(table.name, table.createTableQuery)
  await Promise.all(table.insertQueries.map(execute))
}

export async function createAndPopulateTables(tables: Table[]) {
  await Promise.all(tables.map(createAndPopulateTable))
}
