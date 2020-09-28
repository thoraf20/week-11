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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var user_1 = require("./user");
var router = express_1.default();
router.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error, value, user, saltRounds, salt, _b, newUser, e_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                console.log(req.body);
                _a = user_1.validateUser(req.body), error = _a.error, value = _a.value;
                console.log(value);
                if (error) {
                    throw Error(error.details[0].message);
                }
                return [4 /*yield*/, database_1.Person.findOne({ email: value.email })];
            case 1:
                user = _c.sent();
                if (user)
                    throw Error('Username and Email already exists');
                saltRounds = 10;
                return [4 /*yield*/, bcrypt_1.default.genSalt(saltRounds)];
            case 2:
                salt = _c.sent();
                //Hash the password
                _b = value;
                return [4 /*yield*/, bcrypt_1.default.hash(value.password, salt)];
            case 3:
                //Hash the password
                _b.password = _c.sent();
                newUser = new database_1.Person(value);
                return [4 /*yield*/, newUser.save()];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).json({ message: value.email + " Details successfully registered", })];
            case 5:
                e_1 = _c.sent();
                return [2 /*return*/, res.status(400).send(e_1.message)];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error, value, user, validPassword, token, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                console.log(req.body);
                _a = user_1.checkUser(req.body), error = _a.error, value = _a.value;
                console.log(value);
                if (error) {
                    return [2 /*return*/, res.status(404).send(error.details[0].message)];
                }
                return [4 /*yield*/, database_1.Person.findOne({ email: value.email })];
            case 1:
                user = _b.sent();
                if (!user)
                    throw Error('Invalid Email  and/or Password');
                return [4 /*yield*/, bcrypt_1.default.compare(value.password, user.password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword)
                    throw Error('Invalid email OR password');
                token = user.assignToken();
                res.header('x-auth-token', token).status(200).json({ username: user.username, email: user.email });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                return [2 /*return*/, res.status(400).send(e_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
