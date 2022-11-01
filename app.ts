import { types } from 'cassandra-driver'

import * as api from './data/api/cassandra'
import { tables } from './data/tables'
import { logBlue } from './utils/console'

// users:
// GET all
// GET by id
// GET by name
// items:
// GET all
// GET by ownerId
// GET by title

main()

// A function that queries the data and prints it to the console
async function main() {
  try {
    api.init()
    await api.connect()

    logBlue('> Starting building tables')
    await api.createAndPopulateTables(tables)
    logBlue('> Ended building tables')

    await executeAndLog({
      message: '1. Show all users',
      query: 'SELECT * FROM users;'
    })

    await executeAndLog({
      message: '2. Show all items with title "Nike shoes"',
      query: "SELECT * FROM items_by_title WHERE title = 'Nike shoes';"
    })

    await executeAndLog({
      message: '3. Show all items for owner with id 1',
      query: 'SELECT * FROM items_by_owner_id WHERE ownerId = 1;'
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
  logResult(await api.execute(query))
}

const logResult = (result: types.ResultSet) =>
  result.rows.forEach((row) => console.log({ ...row }))
