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
                resolve(new WrappedConnection(connection));
            }
        })
    });
}

class WrappedConnection {
    constructor(connection) {
        this.connection = connection;
        Object.freeze(this);
    }

    query(options) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                options,
                (err, results, fields) => {
                    if (err != null) {
                        reject(err);
                    } else {
                        resolve({results, fields});
                    }
                }
            );
        });

    }
}

module.exports = {
    getConnection,
};
