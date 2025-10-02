// UserControllers.js
const User = require("./UserModel");

// Listar usuários
async function listarUsuarios(req, res) {
  try {
    const users = await User.getUsers();
    res.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Criar usuário
async function criarUsuario(req, res) {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }
    const newUser = await User.addUser(nome, email);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    if (err.code === "23505") { // UNIQUE violation
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Atualizar usuário
async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ error: "Nome e email são obrigatórios" });
    }
    const updatedUser = await User.updateUser(id, nome, email);
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: "Erro no servidor" });
  }
}

// Deletar usuário
async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário deletado com sucesso", deletedUser });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
}

module.exports = { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario };
