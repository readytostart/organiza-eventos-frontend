"use strict";

const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
