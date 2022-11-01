const usersQueries = [
  `INSERT INTO {{TABLE_NAME}} (userId, name, birthDate) VALUES (1, 'John', toDate('2001-01-01')) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (userId, name, birthDate) VALUES (2, 'Mark', toDate('2002-01-01')) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (userId, name, birthDate) VALUES (3, 'Ammy', toDate('2003-01-01')) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (userId, name, birthDate) VALUES (4, 'Emma', toDate('2004-01-01')) IF NOT EXISTS;`,
  `INSERT INTO {{TABLE_NAME}} (userId, name, birthDate) VALUES (5, 'John', toDate('2005-01-01')) IF NOT EXISTS;`
]

export default usersQueries
