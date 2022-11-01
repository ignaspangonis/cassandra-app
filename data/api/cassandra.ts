import { Client } from 'cassandra-driver'

import usersQueries from '../queries/users'
import itemsQueries from '../queries/items'

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

/////////////////////////

type TableName =
  | 'users'
  | 'users_by_name'
  | 'items_by_owner_id'
  | 'items_by_title'

type Table = {
  name: TableName
  tableQuery: string
  queries: string[]
}

const entityFields = {
  users: `userId INT,
    name TEXT,
    birthDate DATE,`,
  items: `itemId INT,
    ownerId INT,
    title TEXT,
    description TEXT,
    price DECIMAL,`
} as const

const parseQueries = (queries: string[], tableName: TableName) =>
  queries.map((query) => query.replace('{{TABLE_NAME}}', tableName))

const tables: Table[] = [
  {
    name: 'users',
    queries: parseQueries(usersQueries, 'users'),
    tableQuery: `(
      ${entityFields.users},
      PRIMARY KEY(userId))`
  },
  {
    name: 'users_by_name',
    queries: parseQueries(usersQueries, 'users_by_name'),
    tableQuery: `(
      ${entityFields.users}
      PRIMARY KEY((name), birthDate)
    ) WITH CLUSTERING ORDER BY (birthDate ASC)`
  },
  {
    name: 'items_by_owner_id',
    queries: parseQueries(itemsQueries, 'items_by_owner_id'),
    tableQuery: `(
      ${entityFields.items}
      PRIMARY KEY((ownerId), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  },
  {
    name: 'items_by_title',
    queries: parseQueries(itemsQueries, 'items_by_title'),
    tableQuery: `(
      ${entityFields.items}
      PRIMARY KEY((title), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  }
]

async function createAndPopulateTable(table: Table) {
  await dropTable(table.name)
  await createTable(table.name, table.tableQuery)

  await Promise.all(table.queries.map(execute))

  console.log(`Created ${table.name} table`)
}

export async function createAndPopulateTables() {
  await Promise.all(tables.map(createAndPopulateTable))
}
