import express from "express";
import { graphqlHTTP } from "express-graphql";
import bodyParser from "body-parser";
import { carInfo, purchasedInfo, staffInfo } from "./database";
import {
  allCarsType,
  allInfoType,
  purchasedCarsType,
  staffType,
} from "./schema";

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

// Provide resolver functions for your schema fields
const resolvers = {
  hello: () => "Hello world!",
};

const app = express();
// app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//ALL QUERIES
const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    allCompanyInfo: {
      type: allInfoType,
      resolve: async (root, args, context, info) => {
        const allCars = await carInfo.find({});
        const purchase = await purchasedInfo.find({});
        const staffs = await staffInfo.find({});
        const combinedInfo = { allCars, purchase, staffs };
        return combinedInfo;
      },
    },

    Cars: {
      type: GraphQLList(allCarsType),
      resolve: (root, args, context, info) => {
        return carInfo.find().exec();
      },
    },

    CarsById: {
      type: allCarsType,
      args: { id: { type: GraphQLID } },
      resolve: (root, args, context, info) => {
        return carInfo.findById(args.id).exec();
      },
    },

    carsWithCondition: {
      type: allCarsType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        productionDate: { type: GraphQLString },
        color: { type: GraphQLString },
        amount: { type: GraphQLInt },
        condition: { type: GraphQLString },
        price: { type: GraphQLFloat },
      },
      resolve: (root, args, context, info) => {
        return carInfo
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
      type: GraphQLList(purchasedCarsType),
      resolve: (root, args, context, info) => {
        return purchasedInfo.find().exec();
      },
    },
    purchasedById: {
      type: purchasedCarsType,
      args: { id: { type: GraphQLID } },
      resolve: (root, args, context, info) => {
        return purchasedInfo.findById(args.id).exec();
      },
    },

    PurchasedWithCondition: {
      type: GraphQLList(purchasedCarsType),
      args: {
        type: { type: GraphQLString },
        modelNumber: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        buyer: { type: GraphQLString },
        color: { type: GraphQLList(GraphQLString) },
      },

      resolve: (root, args, context, info) => {
        return purchasedInfo
          .find({ $or: [{ type: args.type }, { color: args.color }] })
          .exec();
      },
    },

    //STAFF INFO SECTION
    Staff: {
      type: GraphQLList(staffType),
      resolve: (root, args, context, info) => {
        return staffInfo.find().exec();
      },
    },
    staffById: {
      type: staffType,
      args: { id: { type: GraphQLID } },
      resolve: (root, args, context, info) => {
        return staffInfo.findById(args.id).exec();
      },
    },

    StaffWithCondition: {
      type: GraphQLList(staffType),
      args: {
        position: { type: GraphQLString },
        name: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        homeAddress: { type: GraphQLString },
      },
      resolve: (root, args, context, info) => {
        return staffInfo
          .find({ $or: [{ position: args.position }, { name: args.name }] })
          .exec();
      },
    },
  },
});

//ALL MUTATIONS
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addNewCar: {
      type: allCarsType,
      args: {
        type: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        productionDate: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
        amount: { type: GraphQLNonNull(GraphQLInt) },
        condition: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
      },

      resolve(parent, args) {
        let allCars = new carInfo({
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
      type: staffType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        salary: { type: new GraphQLNonNull(GraphQLInt) },
        homeAddress: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let staffs = new staffInfo({
          name: args.name,
          position: args.position,
          salary: args.salary,
          homeAddress: args.homeAddress,
        });
        return staffs.save();
      },
    },

    newPurchasedCar: {
      type: purchasedCarsType,
      args: {
        type: { type: new GraphQLNonNull(GraphQLString) },
        modelNumber: { type: new GraphQLNonNull(GraphQLString) },
        saleDate: { type: new GraphQLNonNull(GraphQLString) },
        buyer: { type: new GraphQLNonNull(GraphQLString) },
        color: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let purchasedCar = new purchasedInfo({
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
      type: allCarsType,
      args: {
        type: { type: GraphQLString },
        name: { type: GraphQLString },
        productionDate: { type: GraphQLString },
        color: { type: GraphQLList(GraphQLString) },
        amount: { type: GraphQLInt },
        condition: { type: GraphQLString },
        price: {
          type: GraphQLInt,
        },
      },
      async resolve(parent, args) {
        const carUpdate = await carInfo.findById(args.id);

        return carInfo.findOneAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              type: args.type,
              productionDate: args.productionDate,
              color: args.color,
              amount: args.amount,
              condition: args.condition,
              price: args.price,
            },
          },
          { new: true }
        );
      },
    },

    updatePurchasedCars: {
      type: purchasedCarsType,
      args: {
        type: { type: GraphQLString },
        modelNumber: { type: GraphQLString },
        saleDate: { type: GraphQLString },
        color: { type: GraphQLString },
        buyer: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const purchasedUpdate = await purchasedInfo.findById(args.id);

        return purchasedInfo.findOneAndUpdate(
          args.id,
          {
            $set: {
              type: args.type,
              modelNumber: args.modelNumber,
              saleDate: args.saleDate,
              color: args.color,
              buyer: args.buyer,
            },
          },
          { new: true }
        );
      },
    },

    updateStaffs: {
      type: staffType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        salary: { type: GraphQLInt },
        homeAddress: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let staffUpdate: any = await staffInfo.findById(args.id);

        return staffInfo.findOneAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              position: args.position,
              salary: args.salary,
              homeAddress: args.homeAddress,
            },
          },
          { new: true }
        );
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: mutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    rootValue: resolvers,
  })
);

// app.listen(4000);
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);
