const ApiError = require("../../utils/error/ApiError");
const bcryptjs = require("bcryptjs");
const { fetch, fetchAll } = require("../../init/database/pg");
const jwtService = require("../../utils/tokens/jwt.service");

async function registerSuperAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 7);
    const query = `INSERT INTO employee(role_id,username,password) VALUES($1,$2,$3) RETURNING *`;
    const params = [1, username, hashedPassword];

    const data = await fetch(query, ...params);
    const payload = {
      user_id: data.id,
      role_id: data.role_id,
      username: data.username,
    };

    const tokens = jwtService.generateTokens(payload);
    const sQuery = "UPDATE employee SET token=$1 WHERE id=$2";
    const sParams = [tokens.refreshToken, data.id];
    await fetch(sQuery, ...sParams);

    res.send(201, { id: data.id, tokens });
  } catch (e) {
    console.log(e);
    return res.status(502).send({ message: "Internal server error" });
  }
}

async function loginSuperAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await checkAdmin({ role_id: 1, username, password });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const payload = {
      id: user.id,
      role_id: 1,
      username,
    };
    const tokens = jwtService.generateTokens(payload);
    const query = "UPDATE employee SET token=$1 WHERE id=$2";
    const params = [tokens.refreshToken, +user.id];
    await fetch(query, ...params);

    res.send(200, { tokens });
  } catch (error) {
    console.log(error);
    return res.status(502).send({ message: "Internal server error" });
  }
}

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 7);
    const query = `INSERT INTO employee(role_id,username,password) VALUES($1,$2,$3) RETURNING *`;
    const params = [3, username, hashedPassword];

    const data = await fetch(query, ...params);
    const payload = {
      user_id: data.id,
      role_id: data.role_id,
      username: data.username,
    };

    const tokens = jwtService.generateTokens(payload);
    const sQuery = "UPDATE employee SET token=$1 WHERE id=$2";
    const sParams = [tokens.accesToken, data.id];
    await fetch(sQuery, ...sParams);

    res.send(200, { id: data.id, tokens });
  } catch (e) {
    console.log(e);
    return res.status(502).send({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await checkAdmin({ role_id: 3, username, password });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const payload = {
      id: user.id,
      role_id: 3,
      username,
    };
    const tokens = jwtService.generateTokens(payload);
    const query = "UPDATE employee SET token=$1 WHERE id=$2";
    const params = [tokens.refreshToken, +user.id];
    await fetch(query, ...params);

    res.send(200, { tokens });
  } catch (error) {
    console.log(error);
    return res.status(502).send({ message: "Internal server error" });
  }
}

async function createAdmin(req, res) {
  try {
    const { username, password } = req.body;
    const query =
      "INSERT INTO employee(role_id,username,password) VALUES($1,$2,$3)";
    const hashPassword = bcryptjs.hash(password);
    const params = [2, username, hashPassword];
    await fetch(query, ...params);

    res.send(201, { msg: "Created successfully !" });
  } catch (e) {
    return res.status(502).json({ message: "Internal server error" });
  }
}

async function loginAdmin(req, res) {
  const { username, password } = req.body;
  const user = await checkAdmin({ role_id: 2, username, password });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const payload = {
    id: user.id,
    role_id: 2,
    username,
  };
  const tokens = jwtService.generateTokens(payload);
  const query = "UPDATE employee SET token=$1 WHERE id=$2";
  const params = [tokens.refreshToken, +user.id];
  await fetch(query, ...params);

  res.send(200, { tokens });
}

async function checkAdmin(object) {
  const { role_id, username, password } = object;
  const query = `SELECT * FROM employee WHERE role_id=${role_id} AND username='${username}'`;
  const data = await fetch(query);
  return data;
}

async function getUserById(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM employee WHERE id = $1";
    const data = await fetch(query, id);
    if (!data) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function getAll(req, res) {
  try {
    const query = "SELECT * FROM employee";
    const data = await fetch(query);
    res.send(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUserById(req, res) {
  try {
    const id = req.params.id;
    const query = "DELETE FROM employee WHERE id = $1";
    await fetch(query, id);
    res.status(200).send();
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { username, password, role_id } = req.body;
    const query =
      "UPDATE employee SET username=COALESCE($1, username), password=COALESCE($2, password), role_id=COALESCE($3, role_id), updated_at=now() WHERE id=$4 RETURNING id";
    const data = await fetch(query, ...[username, password, role_id]);

    res.status(204).send({ data });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal server error" });
  }
}

async function checkPasswords(hashPassword, password) {
  const isMatch = await bcryptjs.compare(hashPassword, password);
  return isMatch;
}

module.exports = {
  registerSuperAdmin,
  loginSuperAdmin,
  loginUser,
  registerUser,
  createAdmin,
  loginAdmin,
  getUserById,
  getAll,
  updateUser,
  deleteUserById,
};
