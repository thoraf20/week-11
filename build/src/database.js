"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = exports.infoSchema = exports.staffInfo = exports.purchasedInfo = exports.carInfo = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var filePath = path_1.default.resolve(__dirname, ".env");
console.log(filePath);
dotenv_1.default.config({ path: filePath });
var Schema = mongoose_1.default.Schema;
var allCars = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    productionDate: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
var carInfo = mongoose_1.default.model("allCars", allCars);
exports.carInfo = carInfo;
var purchasedCars = new Schema({
    type: String,
    modelNumber: String,
    saleDDate: String,
    buyer: String,
    color: [String],
});
var purchasedInfo = mongoose_1.default.model("purchasedCars", purchasedCars);
exports.purchasedInfo = purchasedInfo;
var staff = new Schema({
    name: String,
    position: String,
    salary: Number,
    homeAddress: String,
});
var staffInfo = mongoose_1.default.model("staffInfo", staff);
exports.staffInfo = staffInfo;
//ORGANIZATION MODEL
var organSchema = new Schema({
    organization: {
        type: String,
        required: true,
        unique: true,
    },
    marketvalue: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    ceo: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    products: {
        type: [String],
        required: true,
    },
    employees: {
        type: [String],
        required: true,
    },
    noOfEmployees: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
var infoSchema = mongoose_1.default.model("Organization", organSchema);
exports.infoSchema = infoSchema;
//USER SCHEMA
var userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
console.log(process.env.PRIVATE_KEY);
userSchema.methods.assignToken = function () {
    var token = jsonwebtoken_1.default.sign({ _id: this._id }, process.env.PRIVATE_KEY);
    return token;
};
var Person = mongoose_1.default.model("User", userSchema);
exports.Person = Person;
