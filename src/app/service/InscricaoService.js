"use strict";

const connectionPool = require("../db/ConnectionPool");

function registrar(lead) {
    return connectionPool.getConnection()
        .then((connection) => {
            connection.query({
                    sql: 'INSERT into db.teste(id, email) VALUES (?, ?)',
                    values: [lead.id, lead.email]
                }, (error, results, fields) => {
                    if (error) throw error;
                }
            );
        })
}

module.exports = {
    registrar,
};
