const { expect } = require("chai");
const request = require("supertest");
const app = require("./index");

describe("GET /mean", () => {
  test("should return 400 if no nums query param", async () => {
    const response = await request(app).get("/mean");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should return 400 if nums is not comma separated", async () => {
    const response = await request(app).get("/mean?nums=invalid");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should return 400 if nums contains non-numeric values", async () => {
    const response = await request(app).get("/mean?nums=1,2,a");
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should return 200 with correct mean for valid nums", async () => {
    const response = await request(app).get("/mean?nums=1,2,3");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      operation: "mean",
      value: 2,
    });
  });
});

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


describe("GET /mode", () => {
  it("should return 400 if no nums query param", async () => {
    const response = await request(app).get("/mode");
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should return mode for valid nums", async () => {
    const response = await request(app).get("/mode?nums=1,2,2,3");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      operation: "mode",
      value: [2],
    });
  });

  it("should return multiple modes if there are multiple", async () => {
    const response = await request(app).get("/mode?nums=1,2,2,3,3");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      operation: "mode",
      value: [2, 3],
    });
  });

  it("should return empty array if no mode", async () => {
    const response = await request(app).get("/mode?nums=1,2,3,4");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      operation: "mode",
      value: [],
    });
  });

  it("should handle invalid nums", async () => {
    const response = await request(app).get("/mode?nums=1,a,3");
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty("error");
  });
});
