const { fetch, fetchAll } = require("../../init/database/pg");

async function getAllHotel(req, res) {
  try {
    const query = "SELECT * FROM hotel";
    const data = await fetchAll(query);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function getHotelById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM hotel WHERE id = $1";
    const data = await fetch(query, id);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function createHotel(req, res) {
  try {
    const { name, image, description, address, stars } = req.body;
    const query =
      "INSERT INTO hotel(name,image,description,address,stars) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const params = [name, image, description, address, stars];

    const data = await fetch(query, ...params);
    res.status(201).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteHotelById(req, res) {
  try {
    const id = req.params.id;
    const query = "DELETE FROM hotel WHERE id = $1";
    const data = await fetch(query, id);

    res.status(202).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function updateHotelById(req, res) {
  try {
    const id = req.params.id;
    const { name, image, description, address, stars } = req.body;
    const query =
      "UPDATE hotel SET name=COALESCE($1, name), image=COALESCE($2, image), description=COALESCE($3, description),address=COALESCE($4,address),stars=COALESCE($5,stars),updated_at=now() WHERE id=$6 RETURNING id";

    const params = [name, image, description, address, stars, id];
    const data = await fetch(query, ...params);

    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  getAllHotel,
  getHotelById,
  createHotel,
  updateHotelById,
  deleteHotelById,
};
