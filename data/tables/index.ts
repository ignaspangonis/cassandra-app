import itemsQueries from '../queries/items'
import usersQueries from '../queries/users'

type TableName =
  | 'users'
  | 'users_by_name'
  | 'items_by_owner_id'
  | 'items_by_title'

export type TableInfo = {
  name: TableName
  query: string
  insertQueries: string[]
}

const parseQueries = (queries: string[], tableName: TableName) =>
  queries.map((query) => query.replace('{{TABLE_NAME}}', tableName))

export const tables: TableInfo[] = [
  {
    name: 'users',
    insertQueries: parseQueries(usersQueries, 'users'),
    query: `(
      userId INT,
      name TEXT,
      birthDate DATE,
      PRIMARY KEY(userId))`
  },
  {
    name: 'users_by_name',
    insertQueries: parseQueries(usersQueries, 'users_by_name'),
    query: `(
      userId INT,
      name TEXT,
      birthDate DATE,
      PRIMARY KEY((name), birthDate, userId)
    ) WITH CLUSTERING ORDER BY (birthDate ASC)`
  },
  {
    name: 'items_by_owner_id',
    insertQueries: parseQueries(itemsQueries, 'items_by_owner_id'),
    query: `(
      itemId INT,
      ownerId INT,
      title TEXT,
      description TEXT,
      price DECIMAL,
      tags SET<TEXT>,
      PRIMARY KEY((ownerId), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  },
  {
    name: 'items_by_title',
    insertQueries: parseQueries(itemsQueries, 'items_by_title'),
    query: `(
      itemId INT,
      ownerId INT,
      title TEXT,
      description TEXT,
      price DECIMAL,
      tags SET<TEXT>,
      PRIMARY KEY((title), itemId)
    ) WITH CLUSTERING ORDER BY (itemId DESC)`
  }
]
