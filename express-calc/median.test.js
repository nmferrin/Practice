const { expect } = require("chai");
const request = require("supertest");
const app = require("./index"); // import app

describe("GET /median", () => {
  it("should return 400 if no nums query param", async () => {
    const response = await request(app).get("/median");
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property("error");
  });

  it("should return median for odd length array", async () => {
    const response = await request(app).get("/median?nums=1,2,3");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({
      operation: "median",
      value: 2,
    });
  });

  it("should return median for even length array", async () => {
    const response = await request(app).get("/median?nums=1,2,3,4");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({
      operation: "median",
      value: 2.5,
    });
  });

  it("should handle invalid nums", async () => {
    const response = await request(app).get("/median?nums=1,a,3");
    expect(response.statusCode).to.equal(400);
    expect(response.body).to.have.property("error");
  });
});
