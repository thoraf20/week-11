import express from "express";
import mongoose from 'mongoose'
import { graphqlHTTP } from "express-graphql";
import bodyParser from "body-parser";
import { infoSchema, Person } from "./database";
import  organizationType  from "./schema1";
import userRouter from './regAuth' 

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


async function test () {
  await mongoose.connect("mongodb+srv://physicist1:physicist1@cluster0.uvzxt.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }, (err) => {
    if (!err) {
      console.log('success')
    }
  });
}

test();


// Provide resolver functions for your schema fields
const resolvers = {
  hello: () => "Hello world!",
};

const app = express();
 app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//QUERIES
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    allOrganizationInfo: {
      type: GraphQLList(organizationType),
      args: {
        organization: { type: GraphQLString },
        marketvalue: { type: GraphQLString },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        products: { type: GraphQLList(GraphQLString) },
        employees: { type: GraphQLList(GraphQLString) },
        noOfEmployees: { type: GraphQLInt },
      },
      resolve: (root, args, context, info) => {
        return infoSchema.find().exec();
      },
    },

    OrganizationWithId: {
      type: organizationType,
      args: {
        id: { type: GraphQLID },
        organization: { type: GraphQLString },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        return infoSchema.findById(args.id).exec();
      },
    },
  },
});

//MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addNewOrganization: {
      type: organizationType,
      args: {
        organization: { type: GraphQLNonNull(GraphQLString) },
        marketvalue: { type: GraphQLNonNull(GraphQLFloat) },
        address: { type: GraphQLNonNull(GraphQLString) },
        ceo: { type: GraphQLNonNull(GraphQLString) },
        country: { type: GraphQLNonNull(GraphQLString) },
        products: { type: GraphQLList(GraphQLString) },
        employees: { type: GraphQLList(GraphQLString) },
        noOfEmployees: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let allOrganization = new infoSchema({
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
      type: organizationType,
      args: {
        id: { type: GraphQLString },
        organization: { type: GraphQLString },
        marketvalue: { type: GraphQLFloat },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        products: { type: GraphQLList(GraphQLString) },
        employees: { type: GraphQLList(GraphQLString) },
        noOfEmployees: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const infoUpdate = await infoSchema.findById(args.id);
        return infoSchema.findOneAndUpdate(
          args.id,
          {
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
          },
          { new: true }
        );
      },
    },
    deleteOrganization: {
      type: organizationType,
      args: {
        id: { type: GraphQLString },
        organization: { type: GraphQLString },
        marketvalue: { type: GraphQLFloat },
        address: { type: GraphQLString },
        ceo: { type: GraphQLString },
        country: { type: GraphQLString },
        products: { type: GraphQLList(GraphQLString) },
        employees: { type: GraphQLList(GraphQLString) },
        noOfEmployees: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const infoUpdate = await infoSchema.findById(args.id);
        return infoSchema.findOneAndDelete(args.id);
      },
    },
  },
});

const schema1 = new GraphQLSchema({
  query: Query,
  mutation: mutation,
});

app.use('/user', userRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema1,
    graphiql: true,
    rootValue: resolvers,
  })
);

// app.listen(4000);
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);

export default app;
