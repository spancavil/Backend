export const mariaDB = {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'example',
      database : 'productos'
    }
}

export const sqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: "./mensajes.sqlite"
    },
    useNullAsDefault: true
}
