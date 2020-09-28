"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var envPath = path_1.default.resolve(__dirname, '../', '.env');
dotenv_1.default.config({ path: envPath });
function auth(req, res, next) {
    var token = req.headers['x-auth-token'];
    // const token = req.headers['']
    if (!token)
        return res.status(401).send('Access denied. No token given!');
    try {
        var decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');
    }
}
exports.auth = auth;
