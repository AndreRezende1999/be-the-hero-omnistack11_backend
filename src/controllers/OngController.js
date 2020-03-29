const connection = require("../database/connection");
const generateUnicId = require("../utils/generateUnicId");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select("*");
    return res.json(ongs);
  },
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const data = req.body;
    const id = generateUnicId();
    console.log(id);
    console.log(name);
    console.log(data);
    await connection("ongs").insert({ id, name, email, whatsapp, city, uf });
    return res.json({ id });
  }
};
