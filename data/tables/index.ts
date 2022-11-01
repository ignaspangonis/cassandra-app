import itemsQueries from '../queries/items'
import usersQueries from '../queries/users'

type TableName =
  | 'users'
  | 'users_by_name'
  | 'items_by_owner_id'
  | 'items_by_title'

export type Table = {
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

export const tables: Table[] = [
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
