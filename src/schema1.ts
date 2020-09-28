import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";

const organizationType = new GraphQLObjectType({
  name: "organSchema",
  fields: {
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    marketvalue: { type: GraphQLFloat },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    products: { type: GraphQLList(GraphQLString) },
    employees: { type: GraphQLList(GraphQLString) },
    noOfEmployees: { type: GraphQLInt },
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
export default organizationType

