"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("../index"));
var request = supertest_1.default(index_1.default);
describe("/", function () {
    it("can get correctly", function (done) {
        request
            .post("/graphql")
            .send({
            query: "\n      query{\n        OrganizationWithId(id:\"5f60cdc576fd80bb110af5a3\"){\n          organization,\n          address,\n          ceo,\n        }\n      }  \n      ",
        })
            .then(function (res) {
            // console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        request
            .post("/graphql")
            .send({
            query: "\n      query{\n        allOrganizationInfo{\n          employees\n        }\n      }  \n      ",
        })
            .then(function (res) {
            // console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        addNewOrganization(\n        organization: \"thoraf Consult\"\n         products: [\"consultancy\", \"Software Development\"]\n         marketvalue: 76.7\n         address: \"torafre\"\n        ceo: \"Rauf\"\n        country: \"Nija\"\n        employees: [\"thoraf\",\"toheeb\"]\n        ){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            // console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        updateOrganizationInfo(\n          id:\"5f60cdc576fd80bb110af5a3\",\n          country:\"Abija\",\n          ){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            // console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
describe("/", function () {
    it("can get correctly", function (done) {
        request
            .post("/graphql")
            .send({
            query: "\n      mutation{\n        deleteOrganization(id:\"5f60cdc576fd80bb110af5a3\"){\n          country\n        }\n      }  \n      ",
        })
            .then(function (res) {
            // console.log(res.text);
            expect(res.status).toBe(200);
            done();
        });
    });
});
afterAll(function (done) {
    mongoose_1.default.connection.close();
    done();
});
