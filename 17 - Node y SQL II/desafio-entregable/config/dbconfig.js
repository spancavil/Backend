const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'mydb'
    },
    pool: { min: 0, max: 7 }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/dbmensajes.sqlite'
    },
    useNullAsDefault: true
}

module.exports = {sqlite3, mysql};