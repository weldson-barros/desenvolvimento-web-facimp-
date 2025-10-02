// UserModel.js
const pool = require("./config");

// Buscar todos os usuários
async function getUsers() {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
}

// Criar usuário
async function addUser(nome, email) {
  const result = await pool.query(
    "INSERT INTO users (nome, email) VALUES ($1, $2) RETURNING *",
    [nome, email]
  );
  return result.rows[0];
}

// Atualizar usuário
async function updateUser(id, nome, email) {
  const result = await pool.query(
    "UPDATE users SET nome = $1, email = $2 WHERE id = $3 RETURNING *",
    [nome, email, id]
  );
  return result.rows[0];
}

// Deletar usuário
async function deleteUser(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
}

module.exports = { getUsers, addUser, updateUser, deleteUser };