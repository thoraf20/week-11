"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.validateUser = void 0;
var joi_1 = __importDefault(require("joi"));
function validateUser(user) {
    var schema = joi_1.default.object({
        username: joi_1.default.string().required().min(6).max(50),
        email: joi_1.default.string().email(),
        password: joi_1.default.string().required().min(6).max(30),
    });
    return schema.validate(user);
}
exports.validateUser = validateUser;
function checkUser(user) {
    var schema = joi_1.default.object({
        email: joi_1.default.string().email(),
        password: joi_1.default.string().required().min(6).max(30),
    });
    return schema.validate(user);
}
exports.checkUser = checkUser;
