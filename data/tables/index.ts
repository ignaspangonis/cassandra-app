import itemsQueries from '../queries/items'
import usersQueries from '../queries/users'

type TableName =
  | 'users'
  | 'users_by_name'
  | 'items_by_owner_id'
  | 'items_by_title'

export type Table = {
  name: TableName
  createTableQuery: string
  insertQueries: string[]
}

const fieldsByEntity = {
  users: `userId INT,
    name TEXT,
    birthDate DATE,`,
  items: `itemId INT,
    ownerId INT,
    title TEXT,
    description TEXT,
    price DECIMAL,
    tags set<text>,`
} as const

const parseQueries = (queries: string[], tableName: TableName) =>
  queries.map((query) => query.replace('{{TABLE_NAME}}', tableName))

export const tables: Table[] = [
  {
    name: 'users',
    insertQueries: parseQueries(usersQueries, 'users'),
    createTableQuery: `(
      ${fieldsByEntity.users},
      PRIMARY KEY(userId))`
  },
  {
    name: 'users_by_name',
    insertQueries: parseQueries(usersQueries, 'users_by_name'),
    createTableQuery: `(
      ${fieldsByEntity.users}
      PRIMARY KEY((name), birthDate)
    ) WITH CLUSTERING ORDER BY (birthDate ASC)`
  },
  {
    name: 'items_by_owner_id',
    insertQueries: parseQueries(itemsQueries, 'items_by_owner_id'),
    createTableQuery: `(
      ${fieldsByEntity.items}
      PRIMARY KEY((ownerId), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  },
  {
    name: 'items_by_title',
    insertQueries: parseQueries(itemsQueries, 'items_by_title'),
    createTableQuery: `(
      ${fieldsByEntity.items}
      PRIMARY KEY((title), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  }
]
