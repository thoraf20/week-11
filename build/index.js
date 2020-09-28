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
var mongoose_1 = __importDefault(require("mongoose"));
var express_graphql_1 = require("express-graphql");
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = require("./database");
var schema1_1 = __importDefault(require("./schema1"));
var regAuth_1 = __importDefault(require("./regAuth"));
var graphql_1 = require("graphql");
function test() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.connect("mongodb+srv://physicist1:physicist1@cluster0.uvzxt.mongodb.net/test", {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                    }, function (err) {
                        if (!err) {
                            console.log('success');
                        }
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
test();
// Provide resolver functions for your schema fields
var resolvers = {
    hello: function () { return "Hello world!"; },
};
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//QUERIES
var Query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        allOrganizationInfo: {
            type: graphql_1.GraphQLList(schema1_1.default),
            args: {
                organization: { type: graphql_1.GraphQLString },
                marketvalue: { type: graphql_1.GraphQLString },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                noOfEmployees: { type: graphql_1.GraphQLInt },
            },
            resolve: function (root, args, context, info) {
                return database_1.infoSchema.find().exec();
            },
        },
        OrganizationWithId: {
            type: schema1_1.default,
            args: {
                id: { type: graphql_1.GraphQLID },
                organization: { type: graphql_1.GraphQLString },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
            },
            resolve: function (root, args, context, info) {
                return database_1.infoSchema.findById(args.id).exec();
            },
        },
    },
});
//MUTATIONS
var mutation = new graphql_1.GraphQLObjectType({
    name: "Mutations",
    fields: {
        addNewOrganization: {
            type: schema1_1.default,
            args: {
                organization: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                marketvalue: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLFloat) },
                address: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                ceo: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                country: { type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                noOfEmployees: { type: graphql_1.GraphQLInt },
            },
            resolve: function (parent, args) {
                var allOrganization = new database_1.infoSchema({
                    organization: args.organization,
                    marketvalue: args.marketvalue,
                    address: args.address,
                    ceo: args.ceo,
                    country: args.country,
                    products: args.products,
                    employees: args.employees,
                    noOfEmployees: args.employees.length,
                });
                return allOrganization.save();
            },
        },
        updateOrganizationInfo: {
            type: schema1_1.default,
            args: {
                id: { type: graphql_1.GraphQLString },
                organization: { type: graphql_1.GraphQLString },
                marketvalue: { type: graphql_1.GraphQLFloat },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                noOfEmployees: { type: graphql_1.GraphQLInt },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var infoUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.infoSchema.findById(args.id)];
                            case 1:
                                infoUpdate = _a.sent();
                                return [2 /*return*/, database_1.infoSchema.findOneAndUpdate(args.id, {
                                        $set: {
                                            organization: args.organization,
                                            marketvalue: args.marketvalue,
                                            address: args.address,
                                            ceo: args.ceo,
                                            country: args.country,
                                            products: args.products,
                                            employess: args.employees,
                                            noOfEmployees: args.noOEmployees,
                                        },
                                    }, { new: true })];
                        }
                    });
                });
            },
        },
        deleteOrganization: {
            type: schema1_1.default,
            args: {
                id: { type: graphql_1.GraphQLString },
                organization: { type: graphql_1.GraphQLString },
                marketvalue: { type: graphql_1.GraphQLFloat },
                address: { type: graphql_1.GraphQLString },
                ceo: { type: graphql_1.GraphQLString },
                country: { type: graphql_1.GraphQLString },
                products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
                noOfEmployees: { type: graphql_1.GraphQLInt },
            },
            resolve: function (parent, args) {
                return __awaiter(this, void 0, void 0, function () {
                    var infoUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, database_1.infoSchema.findById(args.id)];
                            case 1:
                                infoUpdate = _a.sent();
                                return [2 /*return*/, database_1.infoSchema.findOneAndDelete(args.id)];
                        }
                    });
                });
            },
        },
    },
});
var schema1 = new graphql_1.GraphQLSchema({
    query: Query,
    mutation: mutation,
});
app.use('/user', regAuth_1.default);
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema1,
    graphiql: true,
    rootValue: resolvers,
}));
// app.listen(4000);
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);
exports.default = app;
