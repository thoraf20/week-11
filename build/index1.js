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
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var database_1 = require("./database");
var schema_1 = require("./schema");
var graphql_1 = require("graphql");
// Provide resolver functions for your schema fields
var resolvers = {
    hello: function () { return "Hello world!"; },
};
var app = express_1.default();
// app.use(bodyParser.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//ALL QUERIES
var Query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        allCompanyInfo: {
            type: schema_1.allInfoType,
            resolve: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
                var allCars, purchase, staffs, combinedInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, database_1.carInfo.find({})];
                        case 1:
                            allCars = _a.sent();
                            return [4 /*yield*/, database_1.purchasedInfo.find({})];
                        case 2:
                            purchase = _a.sent();
                            return [4 /*yield*/, database_1.staffInfo.find({})];
                        case 3:
                            staffs = _a.sent();
                            combinedInfo = { allCars: allCars, purchase: purchase, staffs: staffs };
                            return [2 /*return*/, combinedInfo];
                    }
                });
            }); },
        },
        Cars: {
            type: graphql_1.GraphQLList(schema_1.allCarsType),
            resolve: function (root, args, context, info) {
                return database_1.carInfo.find().exec();
            },
        },
        CarsById: {
            type: schema_1.allCarsType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (root, args, context, info) {
                return database_1.carInfo.findById(args.id).exec();
            },
        },
        carsWithCondition: {
            type: schema_1.allCarsType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                type: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: { type: graphql_1.GraphQLFloat },
            },
            resolve: function (root, args, context, info) {
                return database_1.carInfo
                    .find({
                    $or: [
                        { type: args.type },
                        { condition: args.condition },
                        { price: args.price },
                    ],
                })
                    .exec();
            },
        },
        //PURCHASE CARS SECTION
        carsPurchased: {
            type: graphql_1.GraphQLList(schema_1.purchasedCarsType),
            resolve: function (root, args, context, info) {
                return database_1.purchasedInfo.find().exec();
            },
        },
        purchasedById: {
            type: schema_1.purchasedCarsType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (root, args, context, info) {
                return database_1.purchasedInfo.findById(args.id).exec();
            },
        },
        PurchasedWithCondition: {
            type: graphql_1.GraphQLList(schema_1.purchasedCarsType),
            args: {
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
            },
            resolve: function (root, args, context, info) {
                return database_1.purchasedInfo
                    .find({ $or: [{ type: args.type }, { color: args.color }] })
                    .exec();
            },
        },
        //STAFF INFO SECTION
        Staff: {
            type: graphql_1.GraphQLList(schema_1.staffType),
            resolve: function (root, args, context, info) {
                return database_1.staffInfo.find().exec();
            },
        },
        staffById: {
            type: schema_1.staffType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (root, args, context, info) {
                return database_1.staffInfo.findById(args.id).exec();
            },
        },
        StaffWithCondition: {
            type: graphql_1.GraphQLList(schema_1.staffType),
            args: {
                position: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLFloat },
                homeAddress: { type: graphql_1.GraphQLString },
            },
            resolve: function (root, args, context, info) {
                return database_1.staffInfo
                    .find({ $or: [{ position: args.position }, { name: args.name }] })
                    .exec();
            },
        },
    },
});
//ALL MUTATIONS
var mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addNewCar: {
            type: schema_1.allCarsType,
            args: {
                type: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                name: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                productionDate: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                amount: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                condition: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                price: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve: function (parent, args) {
                var allCars = new database_1.carInfo({
                    name: args.name,
                    type: args.type,
                    productionDate: args.productionDate,
                    color: args.color,
                    amount: args.amount,
                    condition: args.condition,
                    price: args.price,
                });
                return allCars.save();
            },
        },
        addStaffs: {
            type: schema_1.staffType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                position: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                salary: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                homeAddress: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (parent, args) {
                var staffs = new database_1.staffInfo({
                    name: args.name,
                    position: args.position,
                    salary: args.salary,
                    homeAddress: args.homeAddress,
                });
                return staffs.save();
            },
        },
        newPurchasedCar: {
            type: schema_1.purchasedCarsType,
            args: {
                type: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                modelNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                saleDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                buyer: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                color: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (parent, args) {
                var purchasedCar = new database_1.purchasedInfo({
                    type: args.type,
                    modelNumber: args.modelNumber,
                    saleDate: args.saleDate,
                    buyer: args.buyer,
                    color: args.color,
                });
                return purchasedCar.save();
            },
        },
        updateCars: {
            type: schema_1.allCarsType,
            args: {
                type: { type: graphql_1.GraphQLString },
                name: { type: graphql_1.GraphQLString },
                productionDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                amount: { type: graphql_1.GraphQLInt },
                condition: { type: graphql_1.GraphQLString },
                price: {
                    type: graphql_1.GraphQLInt,
                },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var carUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.carInfo.findById(args.id)];
                            case 1:
                                carUpdate = _a.sent();
                                return [2 /*return*/, database_1.carInfo.findOneAndUpdate(args.id, {
                                        $set: {
                                            name: args.name,
                                            type: args.type,
                                            productionDate: args.productionDate,
                                            color: args.color,
                                            amount: args.amount,
                                            condition: args.condition,
                                            price: args.price,
                                        },
                                    }, { new: true })];
                        }
                    });
                });
            },
        },
        updatePurchasedCars: {
            type: schema_1.purchasedCarsType,
            args: {
                type: { type: graphql_1.GraphQLString },
                modelNumber: { type: graphql_1.GraphQLString },
                saleDate: { type: graphql_1.GraphQLString },
                color: { type: graphql_1.GraphQLString },
                buyer: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var purchasedUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.purchasedInfo.findById(args.id)];
                            case 1:
                                purchasedUpdate = _a.sent();
                                return [2 /*return*/, database_1.purchasedInfo.findOneAndUpdate(args.id, {
                                        $set: {
                                            type: args.type,
                                            modelNumber: args.modelNumber,
                                            saleDate: args.saleDate,
                                            color: args.color,
                                            buyer: args.buyer,
                                        },
                                    }, { new: true })];
                        }
                    });
                });
            },
        },
        updateStaffs: {
            type: schema_1.staffType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                position: { type: graphql_1.GraphQLString },
                salary: { type: graphql_1.GraphQLInt },
                homeAddress: { type: graphql_1.GraphQLString },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var staffUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.staffInfo.findById(args.id)];
                            case 1:
                                staffUpdate = _a.sent();
                                return [2 /*return*/, database_1.staffInfo.findOneAndUpdate(args.id, {
                                        $set: {
                                            name: args.name,
                                            position: args.position,
                                            salary: args.salary,
                                            homeAddress: args.homeAddress,
                                        },
                                    }, { new: true })];
                        }
                    });
                });
            },
        },
    },
});
var schema = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: mutation,
});
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers,
}));
// app.listen(4000);
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);
