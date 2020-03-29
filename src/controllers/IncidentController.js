const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;
    // console.log(((page -1) * 5));

    const [count] = await connection("incidents").count();

    response.header("X-Total-Count", count["count(*)"]);

    //Paginação
    const incidents = await connection("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.uf",
        "ongs.city"
      ]);

    return response.json(incidents);
  },
  async create(request, response) {
    //desestruturação
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    // const incident = await connection('incidents').insert({ //metho
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    // const id incident[0]; //metho
    return response.json({ id });
  },
  async delete(request, response) {
    //desestruturação
    const { id } = request.params;
    //END - desestruturação
    const ong_id = request.headers.authorization;

    //Buscando incidents onde id = id e buscando apenas o valor ong_id para validação
    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first();

    if (!incident) {
      return response.json({ error: "Id inválid" });
    }

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents")
      .where("id", id)
      .delete();
    //O send() é utilizado para enviar a resposta sem body
    return response.status(204).send();
  }
};
