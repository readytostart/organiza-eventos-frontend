"use strict";

const mysql = require('mysql');

class ConnectionPool {
    constructor() {
        this.connectionParams = {
            host: process.env.DB_HOST,
            socketPath: process.env.DB_SOCKETPATH,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        };
        Object.freeze(this.connectionParams);

        console.log("ConnectionPool.connectionParams: ", JSON.stringify(this.connectionParams));

        Object.freeze(this);
    }

    getConnection() {
        return new Promise((resolve, reject) => {
            try {
                let connection = mysql.createConnection(this.connectionParams);

                connection.connect((err) => {
                    if (err != null) {
                        reject(err);
                    } else {
                        resolve(new WrappedConnection(connection));
                    }
                })
            } catch (err) {
                reject(err);
            }
        });
    }
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

module.exports = new ConnectionPool();
