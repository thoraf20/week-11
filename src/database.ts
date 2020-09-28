import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

const filePath = path.resolve(__dirname,".env");
console.log(filePath);

dotenv.config({path : filePath});

const Schema = mongoose.Schema;

const allCars = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  type: {
    type: String,
    required: true,
  },

  productionDate: {
    type: String,
    required: true,
  },

  color: {
    type: [String],
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const carInfo = mongoose.model("allCars", allCars);

const purchasedCars = new Schema({
  type: String,
  modelNumber: String,
  saleDDate: String,
  buyer: String,
  color: [String],
});

const purchasedInfo = mongoose.model("purchasedCars", purchasedCars);

const staff = new Schema({
  name: String,
  position: String,
  salary: Number,
  homeAddress: String,
});

const staffInfo = mongoose.model("staffInfo", staff);

//ORGANIZATION MODEL
const organSchema = new Schema(
  {
    organization: {
      type: String,
      required: true,
      unique: true,
    },

    marketvalue: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    ceo: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
    employees: {
      type: [String],
      required: true,
    },
    noOfEmployees: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const infoSchema = mongoose.model("Organization", organSchema);

//USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

console.log(process.env.PRIVATE_KEY);


userSchema.methods.assignToken = function (){
  const token = jwt.sign({_id : this._id}, process.env.PRIVATE_KEY as string);
  return token;
}

const Person = mongoose.model("User", userSchema);

export { carInfo, purchasedInfo, staffInfo, infoSchema, Person };
