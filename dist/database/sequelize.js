"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connect = new sequelize_typescript_1.Sequelize({
    "username": "urvish",
    "password": "ubuntu",
    "database": "collection",
    "host": "127.0.0.1",
    "dialect": "mysql",
});
exports.default = connect;
