import supertest from "supertest";
import mongoose from 'mongoose'
import app from "../index";

const request = supertest(app);


beforeAll(async () => await jest.useFakeTimers());


describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
      query{
        OrganizationWithId(id:"5f60cdc576fd80bb110af5a3"){
          organization,
          address,
          ceo,
        }
      }  
      `,
      })
      .then((res) => {
        // console.log(res.text);
        expect(res.status).toBe(200);
       
      });
    done();
  });
});

describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
      query{
        allOrganizationInfo{
          employees
        }
      }  
      `,
      })
      .then((res) => {
        // console.log(res.text);
        expect(res.status).toBe(200);
        
      });
    done();
  });
});

describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
      mutation{
        addNewOrganization(
        organization: "thoraf Consult"
         products: ["consultancy", "Software Development"]
         marketvalue: 76.7
         address: "torafre"
        ceo: "Rauf"
        country: "Nija"
        employees: ["thoraf","toheeb"]
        ){
          country
        }
      }  
      `,
      })
      .then((res) => {
        // console.log(res.text);
        expect(res.status).toBe(200);
       
      });
    done();
  });
});

describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
      mutation{
        updateOrganizationInfo(
          id:"5f60cdc576fd80bb110af5a3",
          country:"Abija",
          ){
          country
        }
      }  
      `,
      })
      .then((res) => {
        // console.log(res.text);
        expect(res.status).toBe(200);
        
      });
    done();
  });
});
describe("/", () => {
  it("can get correctly", (done) => {
    request
      .post("/graphql")
      .send({
        query: `
      mutation{
        deleteOrganization(id:"5f60cdc576fd80bb110af5a3"){
          country
        }
      }  
      `,
      })
      .then((res) => {
        // console.log(res.text);
        expect(res.status).toBe(200);
        
      });
    done();
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});