import mongoose from "mongoose";
import * as Schemas from "../database";
import { MongoMemoryServer } from "mongodb-memory-server";
const mongod = new MongoMemoryServer();

const connect = async () => {
  const uri = "mongodb://localhost/week-9";
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
     useUnifiedTopology: false,
    useCreateIndex: true,
  };

  await mongoose.connect(uri, options);
};

const closeDb = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

const clearDb = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({}, () => {});
  }
};

beforeAll(async () => connect());

afterAll(async () => closeDb());

describe("POST route ", () => {
  /**
   * Tests that you can post to db.
   */
  let data = {
    products: ["Mango", "Cashew"],
    employees: ["rafuu", "Bulus"],
    ceo: "Chika",
    organization: "Riutfj",
    address: "US",
    country: "Nigeria",
    marketvalue: 90,
  };

  it("can be created correctly", async () => {
    expect(async () => await Schemas.infoSchema.create(data)).not.toThrow();
  });
});

describe("filter by ID", () => {
  /**
   * Tests that you can find by id
   */
  it("can be get correctly", async () => {
    expect(
      async () => await Schemas.infoSchema.findById("5f71fe0af15b18001d8202ca")
    ).not.toThrow();
  });
});

describe("delete by ID", () => {
  /**
   * Tests deleting from db
   */
  it("can be delete correctly", async () => {
    expect(
      async () =>
        await Schemas.infoSchema.findByIdAndRemove("5f5575724c08c2f6ede2c5eb")
    ).not.toThrow();
  });
});

describe("delete by ID", () => {
  /**
   * Tests deleting from db
   */
  it("can be delete correctly", async () => {
    expect(
      async () =>
        await Schemas.infoSchema.findByIdAndRemove("5f5575724c08c2f6ede2c5eb")
    ).not.toThrow();
  });
});

describe("Update by ID route ", () => {
  /**
   * Tests updating from db
   */
  it("can be updates correctly", async () => {
    expect(
      async () =>
        await Schemas.infoSchema.findByIdAndUpdate(
          "5f5807eebf17492f7b49351f",
          {
            products: ["Mango", "Cashew"],
            employees: ["Uche", "Bulus", "Joseph"],
            noOfEmployees: 2,
            ceo: "chika",
            organization: "Rggfj",
            address: "US",
            country: "Nigeria",
            marketValue: 90,
          },
          { new: true }
        )
    ).not.toThrow();
  });
});

describe("filter by organization name ", () => {
  /**
   * Tests updating from db
   */
  it("can be filtered by organization name correctly", async () => {
    let data = {
      products: ["Mango", "Cashew"],
      employees: ["Uche", "Bulus", "Joseph"],
      noOfEmployees: 2,
      ceo: "chika",
      organization: "Rggfj",
      address: "US",
      country: "Nigeria",
      marketValue: 90,
    };
    expect(
      async () =>
        await Schemas.infoSchema.find({ organization: data.organization })
    ).not.toThrow();
  });
});

describe("filter by market value", () => {
  /**
   * Tests updating from db
   */
  it("can be filter by market value correctly", async () => {
    let data = {
      products: ["Mango", "Cashew"],
      employees: ["Uche", "Bulus", "Joseph"],
      noOfEmployees: 2,
      ceo: "chika",
      organization: "Rggfj",
      address: "US",
      country: "Nigeria",
      marketValue: 90,
    };
    expect(
      async () =>
        await Schemas.infoSchema.find({ marketValue: data.marketValue })
    ).not.toThrow();
  });
});

describe("Can get all from database", () => {
  /**
   * Tests updating from db
   */
  it("can get all correctly", async () => {
    expect(async () => await Schemas.infoSchema.find()).not.toThrow();
  });
});
