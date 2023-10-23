"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const HTTPError_1 = require("../helper/HTTPError");
const userService_1 = require("../service/userService");
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email)
                throw new HTTPError_1.HTTPError("Missing parameters");
            const userService = new userService_1.UserService();
            const userAlreadyExists = yield userService.findByEmail(email);
            if (userAlreadyExists)
                throw new HTTPError_1.HTTPError("User already exists", 409);
            const user = yield userService.create({ name, email, password });
            return res.status(201).json(user);
        });
    }
    static findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new userService_1.UserService();
            const users = yield userService.findAll();
            return res.status(200).json(users);
        });
    }
    static findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userService = new userService_1.UserService();
            const user = yield userService.findById(Number(id));
            if (!user)
                throw new HTTPError_1.HTTPError("User not found", 404);
            return res.status(200).json(user);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id)
                throw new HTTPError_1.HTTPError("Missing user id");
            const userService = new userService_1.UserService();
            const deleted = yield userService.delete(Number(id));
            if (!deleted)
                throw new HTTPError_1.HTTPError("User not found", 404);
            return res.status(200).json({ deleted });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, email, password } = req.body;
            if (!id)
                throw new HTTPError_1.HTTPError("Missing user id");
            const userService = new userService_1.UserService();
            const updated = yield userService.update(Number(id), { name, email, password });
            if (!updated)
                throw new HTTPError_1.HTTPError("User not found", 404);
            return res.status(200).json({ updated });
        });
    }
}
exports.UserController = UserController;
