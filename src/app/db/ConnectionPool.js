"use strict";

const mysql = require('mysql');
const argv = require('yargs').argv;

const pool = mysql.createPool({
    host: argv.db.host,
    database: argv.db.database,
    user: argv.db.user,
    password: argv.db.password,
});

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err != null) {
                reject(err);
            } else {
                resolve(connection);
            }
        })

    });
}

module.exports = {
    getConnection,
};
