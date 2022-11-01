const itemsQueries = [
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price) VALUES (1, 1, 'Nike shoes', 'Nice item', 4.2) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price) VALUES (2, 2, 'Puma shoes', 'Cool item', 4.2) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price) VALUES (3, 1, 'Fila shoes', 'Nice item', 4.2) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price) VALUES (4, 2, 'Anta dress', 'Cool item', 4.2) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price) VALUES (5, 1, 'Nike pants', 'Nice item', 4.2) IF NOT EXISTS;`
]

// Function that inserts data into the table
// const insertData = async (tableName: string) => {
//   for (const query of queries) {
//     await client.execute(query.replace('{{TABLE_NAME}}', tableName))
//   }
// }

export default itemsQueries
