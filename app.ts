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

    await executeAndPrint({
      message: '1. Show all users',
      query: 'SELECT * FROM users;'
    })

    await executeAndPrint({
      message: '2. Show all items',
      query: 'SELECT * FROM items_by_owner_id;'
    })
  } catch (error) {
    console.error(error)
  }

  api.shutdown()
}

async function executeAndPrint({
  message,
  query
}: {
  message: string
  query: string
}) {
  logBlue(message)
  printResult(await api.execute(query))
}

const printResult = (result: types.ResultSet) =>
  result.rows.forEach((row) => console.log({ ...row }))
