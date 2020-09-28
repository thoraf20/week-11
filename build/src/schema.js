"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allCarsType = exports.staffType = exports.purchasedCarsType = exports.allInfoType = void 0;
var graphql_1 = require("graphql");
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost/week-9", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
var allCarsType = new graphql_1.GraphQLObjectType({
    name: "allCars",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        type: { type: graphql_1.GraphQLString },
        productionDate: { type: graphql_1.GraphQLString },
        color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        amount: { type: graphql_1.GraphQLFloat },
        condition: { type: graphql_1.GraphQLString },
        price: { type: graphql_1.GraphQLFloat },
    },
});
exports.allCarsType = allCarsType;
var purchasedCarsType = new graphql_1.GraphQLObjectType({
    name: "purchasedCars",
    fields: {
        type: {
            type: graphql_1.GraphQLString,
        },
        modelNumber: {
            type: graphql_1.GraphQLString,
        },
        saleDate: {
            type: graphql_1.GraphQLString,
        },
        buyer: {
            type: graphql_1.GraphQLString,
        },
        color: {
            type: graphql_1.GraphQLList(graphql_1.GraphQLString),
        },
    },
});
exports.purchasedCarsType = purchasedCarsType;
var staffType = new graphql_1.GraphQLObjectType({
    name: "staffs",
    fields: {
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLFloat },
        homeAddress: { type: graphql_1.GraphQLString },
    },
});
exports.staffType = staffType;
var allInfoType = new graphql_1.GraphQLObjectType({
    name: "allInfo",
    fields: {
        allCars: { type: new graphql_1.GraphQLList(allCarsType) },
        purchase: { type: new graphql_1.GraphQLList(purchasedCarsType) },
        staffs: { type: new graphql_1.GraphQLList(staffType) },
    },
});
exports.allInfoType = allInfoType;
