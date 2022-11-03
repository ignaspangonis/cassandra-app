const itemsQueries = [
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price, tags) VALUES (1, 1, 'Nike shoes', 'Nice item', 4.2, {'new', 'swappable'}) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price, tags) VALUES (2, 2, 'Puma shoes', 'Cool item', 4.2, {'old', 'with tags'}) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price, tags) VALUES (3, 1, 'Fila shoes', 'Extra wow', 4.2, {'new', 'swappable'}) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price, tags) VALUES (4, 2, 'Anta dress', 'Amazement', 4.2, {'old', 'with tags'}) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (itemId, ownerId, title, description, price, tags) VALUES (5, 1, 'Nike shoes', 'Wow item!', 4.2, {'new', 'swappable'}) IF NOT EXISTS;`
]

export default itemsQueries
