const { fetch, fetchAll } = require("../../init/database/pg");

async function getAllTours(req, res) {
  try {
    const query = "SELECT * FROM tour";
    const data = await fetchAll(query);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function getTourById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM tour WHERE id = $1";
    const data = await fetch(query, id);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function createTour(req, res) {
  try {
    const { name, description, images, address, price, day } = req.body;
    const query =
      "INSERT INTO tour(name,description,images,address,price,day) VALUES($1,$2,$3,$4,$5,$6)";
    const params = [name, description, images, address, price, day];

    const data = await fetch(query, ...params);
    res.status(201).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteTourById(req, res) {
  try {
    const id = req.params.id;
    const query = "DELETE FROM tour WHERE id = $1";
    const data = await fetch(query, id);

    res.status(202).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function updateTourById(req, res) {
  try {
    const id = req.params.id;
    const { name, description, images, address, price, day } = req.body;
    const query =
      "UPDATE tour SET name=COALESCE($1, name), description=COALESCE($2, description),images=COALESCE($3, images),address=COALESCE($4, address),price=COALESCE($5, price),day=COALESCE($6,day),updated_at=now() WHERE id=$7 RETURNING id";

    const params = [name, description, images, address, price, day, id];
    const data = await fetch(query, ...params);

    res.status(204).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  deleteTourById,
  updateTourById,
};
