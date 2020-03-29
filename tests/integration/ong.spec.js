const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });
  it("should be able to crate a ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Hemo",
        email: "contato@apad.com.br",
        whatsapp: "000000000000",
        city: "Belo Horizonte",
        uf: "mg"
      });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
