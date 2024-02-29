const request = require('supertest');
const app = require('../index')

describe("GET /items", () => {
    it("should get all items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});