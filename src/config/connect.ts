import { Sequelize } from "sequelize-typescript";
import {User} from "../models/User";

const connect = new Sequelize({
    "username": "urvish",
    "password": "ubuntu",
    "database": "collection",
    "host": "127.0.0.1",
    "dialect": "mysql",

});

export default connect;