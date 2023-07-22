const { fetch, fetchAll } = require("../../init/database/pg");

async function getAllSocial(req, res) {
  try {
    const query = "SELECT * FROM social";
    const data = await fetchAll(query);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function getSocialById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM social WHERE id = $1";
    const data = await fetch(query, id);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function createSocial(req, res) {
  try {
    const { name, link } = req.body;
    const query = "INSERT INTO social(name,link) VALUES($1,$2)";
    const params = [name, link];

    const data = await fetch(query, ...params);
    res.status(201).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteSocialById(req, res) {
  try {
    const id = req.params.id;
    const query = "DELETE FROM social WHERE id = $1";
    const data = await fetch(query, id);

    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function updateSocialById(req, res) {
  try {
    const id = req.params.id;
    const { name, image, description, address, stars } = req.body;
    const query =
      "UPDATE social SET name=COALESCE($1, name), link=COALESCE($2, link),updated_at=now() WHERE id=$6 RETURNING id";

    const params = [name, image, description, address, stars, id];
    const data = await fetch(query, ...params);

    res.status(204).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  getAllSocial,
  getSocialById,
  createSocial,
  updateSocialById,
  deleteSocialById,
};
