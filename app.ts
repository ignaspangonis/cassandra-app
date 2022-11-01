import { types } from 'cassandra-driver'

import * as api from './data/api/cassandra'
import { tables } from './data/tables'
import { logBlue } from './utils/console'

main()

async function main() {
  try {
    api.init()
    await api.connect()

    logBlue('> Starting building tables')
    await api.createAndPopulateTables(tables)
    logBlue('> Ended building tables')

    await executeAndLog({
      message: '1. Get all users',
      query: 'SELECT * FROM users;'
    })

    await executeAndLog({
      message: '2. Get all items with title "Nike shoes"',
      query: "SELECT * FROM items_by_title WHERE title = 'Nike shoes';"
    })

    await executeAndLog({
      message: '3. Get all items for owner with id 1',
      query: 'SELECT * FROM items_by_owner_id WHERE ownerId = 1;'
    })

    await executeAndLog({
      message: '4. Get all users with name John born after 2022-01-01',
      query:
        "SELECT * FROM users_by_name WHERE name='John' AND birthDate > toDate('2002-01-01');"
    })

    await executeAndLog({
      message: '5. Get titles of all items',
      query: 'SELECT title FROM items_by_title;'
    })
  } catch (error) {
    console.error(error)
  }

  api.shutdown()
}

async function executeAndLog({
  message,
  query
}: {
  message: string
  query: string
}) {
  logBlue(message)
  logQueryResult(await api.execute(query))
}

const logQueryResult = (result: types.ResultSet) =>
  result.rows.forEach((row) => console.log({ ...row }))
