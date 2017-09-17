"use strict";

const connectionPool = require("../db/ConnectionPool");

async function registrar(lead) {
    const connection = await connectionPool.getConnection();

    await connection.query({
            sql: 'INSERT into db.teste SET ?',
            values: lead
        }
    );
}

module.exports = {
    registrar,
};
