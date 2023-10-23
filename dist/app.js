"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("./routes/user.routes");
const errorHandler_1 = require("./helper/errorHandler");
const connect_1 = __importDefault(require("./config/connect"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/users", user_routes_1.userRouter);
exports.app.use(errorHandler_1.errorHandler);
connect_1.default.sync().then(() => {
    console.log("Database Conected Successfully");
}).catch((err) => {
    console.log("Err", err);
});
exports.app.use("", (req, res) => {
    return res.status(404).json({
        status: 404,
        message: "Route not found",
    });
});
const PORT = 3000;
exports.app.listen(PORT, () => {
    console.log("The server is running on port " + PORT);
});
