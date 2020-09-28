"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var organizationType = new graphql_1.GraphQLObjectType({
    name: "organSchema",
    fields: {
        id: { type: graphql_1.GraphQLID },
        organization: { type: graphql_1.GraphQLString },
        marketvalue: { type: graphql_1.GraphQLFloat },
        address: { type: graphql_1.GraphQLString },
        ceo: { type: graphql_1.GraphQLString },
        country: { type: graphql_1.GraphQLString },
        products: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        employees: { type: graphql_1.GraphQLList(graphql_1.GraphQLString) },
        noOfEmployees: { type: graphql_1.GraphQLInt },
    },
});
// const userType = new GraphQLObjectType({
//   name: "userSchema",
//   fields: {
//     username: { type: GraphQLNonNull(GraphQLString) },
//     email: { type: GraphQLNonNull(GraphQLString) },
//     password: { type: GraphQLNonNull(GraphQLString) },
//   },
// });
// const Auth = new GraphQLObjectType({
//   name: "login",
//   fields: {
//     userId: { type: GraphQLID },
//     token: { type: GraphQLString },
//     tokenExpiration: { type: GraphQLInt },
//   },
// });
// export { organizationType, userType, Auth };
exports.default = organizationType;
