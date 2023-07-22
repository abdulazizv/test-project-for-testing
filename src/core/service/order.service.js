const { fetch, fetchAll } = require("../../init/database/pg");

async function getAllOrder(req, res) {
  try {
    const query = "SELECT * FROM orderr";
    const data = await fetchAll(query);
    res.status(201).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function getOrderById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM orderr WHERE id = $1";
    const data = await fetch(query, id);
    res.status(200).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function createOrder(req, res) {
  try {
    const { full_name, tour_type, phone_number } = req.body;
    const query =
      "INSERT INTO orderr(full_name,tour_type,phone_number) VALUES($1,$2,$3)";
    const params = [full_name, tour_type, phone_number];

    const data = await fetch(query, ...params);
    res.status(201).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function deleteOrderById(req, res) {
  try {
    const id = req.params.id;
    const query = "DELETE FROM orderr WHERE id = $1";
    const data = await fetch(query, id);

    res.status(202).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function updateOrderById(req, res) {
  try {
    const id = req.params.id;
    const { full_name, tour_type, phone_number } = req.body;
    const query =
      "UPDATE orderr SET full_name=COALESCE($1, full_name), tour_type=COALESCE($2, tour_type), phone_number=COALESCE($3, phone_number),updated_at=now() WHERE id=$4 RETURNING id";

    const params = [full_name, tour_type, phone_number, id];
    const data = await fetch(query, ...params);

    res.status(204).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = {
  getAllOrder,
  getOrderById,
  createOrder,
  deleteOrderById,
  updateOrderById,
};
