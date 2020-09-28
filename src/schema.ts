import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
} from "graphql";

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/week-9", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const allCarsType = new GraphQLObjectType({
  name: "allCars",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    productionDate: { type: GraphQLString },
    color: { type: GraphQLList(GraphQLString) },
    amount: { type: GraphQLFloat },
    condition: { type: GraphQLString },
    price: { type: GraphQLFloat },
  },
});

const purchasedCarsType = new GraphQLObjectType({
  name: "purchasedCars",
  fields: {
    type: {
      type: GraphQLString,
    },
    modelNumber: {
      type: GraphQLString,
    },
    saleDate: {
      type: GraphQLString,
    },
    buyer: {
      type: GraphQLString,
    },
    color: {
      type: GraphQLList(GraphQLString),
    },
  },
});

const staffType = new GraphQLObjectType({
  name: "staffs",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    homeAddress: { type: GraphQLString },
  },
});

const allInfoType = new GraphQLObjectType({
  name: "allInfo",
  fields: {
    allCars: { type: new GraphQLList(allCarsType) },
    purchase: { type: new GraphQLList(purchasedCarsType) },
    staffs: { type: new GraphQLList(staffType) },
  },
});

export { allInfoType, purchasedCarsType, staffType, allCarsType };
