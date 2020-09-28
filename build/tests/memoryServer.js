"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var mongoose_1 = __importDefault(require("mongoose"));
var Schemas = __importStar(require("../database"));
var mongodb_memory_server_1 = require("mongodb-memory-server");
var mongod = new mongodb_memory_server_1.MongoMemoryServer();
var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    var uri, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uri = "mongodb://localhost/week-9";
                options = {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                };
                return [4 /*yield*/, mongoose_1.default.connect(uri, options)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var closeDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose_1.default.connection.dropDatabase()];
            case 1:
                _a.sent();
                return [4 /*yield*/, mongoose_1.default.connection.close()];
            case 2:
                _a.sent();
                return [4 /*yield*/, mongod.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var clearDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var collections, _a, _b, _i, key, collection;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                collections = mongoose_1.default.connection.collections;
                _a = [];
                for (_b in collections)
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                collection = collections[key];
                return [4 /*yield*/, collection.deleteMany({}, function () { })];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, connect()];
}); }); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, closeDb()];
}); }); });
describe("POST route ", function () {
    /**
     * Tests that you can post to db.
     */
    var data = {
        // _id: "5f720d60f15b18001d8202cb",
        products: ["Mango", "Cashew"],
        employees: ["rafuu", "Bulus"],
        ceo: "Chika",
        organization: "Riutfj",
        address: "US",
        country: "Nigeria",
        marketvalue: 90,
    };
    //   data["noOfEmployees"] = data.employees.length;
    it("can be created correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.create(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("filter by ID", function () {
    /**
     * Tests that you can find by id
     */
    it("can be get correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.findById("5f71fe0af15b18001d8202ca")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("delete by ID", function () {
    /**
     * Tests deleting from db
     */
    it("can be delete correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.findByIdAndRemove("5f5575724c08c2f6ede2c5eb")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("delete by ID", function () {
    /**
     * Tests deleting from db
     */
    it("can be delete correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.findByIdAndRemove("5f5575724c08c2f6ede2c5eb")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("Update by ID route ", function () {
    /**
     * Tests updating from db
     */
    it("can be updates correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Schemas.infoSchema.findByIdAndUpdate("5f5807eebf17492f7b49351f", {
                                products: ["Mango", "Cashew"],
                                employees: ["Uche", "Bulus", "Joseph"],
                                noOfEmployees: 2,
                                ceo: "chika",
                                organization: "Rggfj",
                                address: "US",
                                country: "Nigeria",
                                marketValue: 90,
                            }, { new: true })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("filter by organization name ", function () {
    /**
     * Tests updating from db
     */
    it("can be filtered by organization name correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = {
                products: ["Mango", "Cashew"],
                employees: ["Uche", "Bulus", "Joseph"],
                noOfEmployees: 2,
                ceo: "chika",
                organization: "Rggfj",
                address: "US",
                country: "Nigeria",
                marketValue: 90,
            };
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.find({ organization: data.organization })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("filter by market value", function () {
    /**
     * Tests updating from db
     */
    it("can be filter by market value correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            data = {
                products: ["Mango", "Cashew"],
                employees: ["Uche", "Bulus", "Joseph"],
                noOfEmployees: 2,
                ceo: "chika",
                organization: "Rggfj",
                address: "US",
                country: "Nigeria",
                marketValue: 90,
            };
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.find({ marketValue: data.marketValue })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
describe("Can get all from database", function () {
    /**
     * Tests updating from db
     */
    it("can get all correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Schemas.infoSchema.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
