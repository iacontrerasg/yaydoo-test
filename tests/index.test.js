import { it, describe } from "mocha";
import { expect } from "chai";
import config from "config";
import request from "supertest";
import server from "../src/index";

describe("Server", () => {
  it("tests that server is running current port", async () => {
    expect(server.port).to.equal(config.get("port"));
  });
});

describe("All Products", () => {
  it("GET /v1/products/ returns an array of all products", async () => {
    const response = await request(server).get("/v1/products");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an.instanceof(Array);
  });
});

describe("Products By Category", () => {
  it("GET /v1/products/:category returns an array of all products", async () => {
    const response = await request(server).get("/v1/products/baby");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an.instanceof(Array);
  });
});

describe("Categories", () => {
  it("GET /v1/categories returns an array of categories", async () => {
    const response = await request(server).get("/v1/categories");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an.instanceof(Array);
  });
});


describe("Categories", () => {
  it("GET /v1/categories returns an array of categories", async () => {
    const response = await request(server).get("/v1/categories");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an.instanceof(Array);
  });
});
