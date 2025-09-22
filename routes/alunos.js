const express = require("express");
const router = express.Router();

router.post("/alunos", (req, res, next) => {});

let ListaDeAlunos = [
  {
    id: "1",
    nome: "Arthur Exemplo 1",
    email: "arthurexemplo1@gmail.com",
    cpf: "00100100101",
    telefone: "(61) 990000001",
    dataNascimento: "01/01/2001",
  },
  {
    id: "2",
    nome: "Beatriz Exemplo 2",
    email: "beatrizexemplo2@gmail.com",
    cpf: "00200200202",
    telefone: "(61) 990000002",
    dataNascimento: "04/07/2005",
  },
];

router.post("/alunos", (req, res, next) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res
      .status(400)
      .json({ error: "nome, cpf, email e dataNascimento são obrigatórios!" });
  }

  const aluno = ListaDeAlunos.find((a) => a.cpf == cpf);
  if (aluno) {
    return res.status(409).json({ error: "cpf já cadastrado!" });
  }

  const novoAluno = {
    id: Date.now(),
    nome,
    email,
    cpf,
    telefone,
    dataNascimento,
  };

  ListaDeAlunos.push(novoAluno);
  res.status(201).json({ message: "pessoa cadastrada -> ", novoAluno });
});

router.get("/alunos", (req, res, next) => {
  res.status(200).json(ListaDeAlunos);
});

router.get("/alunos/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const alunoRecebido = ListaDeAlunos.find((a) => a.id == idRecebido);
  if (!alunoRecebido) {
    return res.status(404).json({ error: "Aluno não encontrado!" });
  }

  res.status(200).json(alunoRecebido);
});

router.put("/alunos/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const { nome, telefone, email, dataNascimento } = req.body;

  if (!nome || !telefone || !email || !dataNascimento) {
    return res.status(400).json({
      error: "nome, telefone, email e dataNascimento são obrigatórios!",
    });
  }

  const aluno = ListaDeAlunos.find((a) => a.id == idRecebido);
  if (!aluno) {
    return res.status(404).json({ error: "aluno não encontrado!" });
  }

  aluno.nome = nome;
  aluno.telefone = telefone;
  aluno.email = email;
  aluno.dataNascimento = dataNascimento;

  res.json({ message: "aluno atualizado com sucesso!" });
});

router.delete("/aluno/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const aluno = ListaDeAlunos.find((a) => a.id == idRecebido);

  if (!aluno) {
    return res.status(404).json({ error: "pessoa não encontrada!" });
  }

  aluno = ListaDeAlunos.filter((a) => a.id != idRecebido);

  res.json({ message: "pessoa excluída com sucesso!" });
});

module.exports = router;
