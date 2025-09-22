const express = require("express");
const router = express.Router();

router.post("/professores", (req, res, next) => {});

let ListaDeProfessores = [
  {
    id: "1",
    nome: "Amanda Autogata",
    email: "arthurautogata@gmail.com",
    cpf: "11122233311",
    curso: "ADS",
    disciplina: "Engenharia de Software",
  },
  {
    id: "2",
    nome: "Benicio Deltoro",
    email: "beniciodeltoro@gmail.com",
    cpf: "11122233322",
    curso: "Ginecologia",
    disciplina: "Biologia Básica",
  },
];

router.post("/professores", (req, res, next) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res
      .status(400)
      .json({ error: "nome, cpf, curso, email e disciplina são obrigatórios!" });
  }

  const professor = ListaDeProfessores.find((p) => p.cpf == cpf);
  if (professor) {
    return res.status(409).json({ error: "cpf já cadastrado!" });
  }

  const novoProfessor = {
    id: Date.now(),
    nome,
    email,
    cpf,
    curso,
    disciplina,
  };

  ListaDeprofessores.push(novoProfessor);
  res.status(201).json({ message: "professor cadastrado -> ", novoProfessor });
});

router.get("/professores", (req, res, next) => {
  res.status(200).json(ListaDeprofessores);
});

router.get("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const professorRecebido = ListaDeprofessores.find((p) => p.id == idRecebido);
  if (!professorRecebido) {
    return res.status(404).json({ error: "professor não encontrado!" });
  }

  res.status(200).json(professorRecebido);
});

router.put("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const { nome, curso, email, disciplina } = req.body;

  if (!nome || !curso || !email || !disciplina) {
    return res.status(400).json({
      error: "nome, curso, email e disciplina são obrigatórios!",
    });
  }

  const professor = ListaDeprofessores.find((p) => p.id == idRecebido);
  if (!professor) {
    return res.status(404).json({ error: "professor não encontrado!" });
  }

  professor.nome = nome;
  professor.curso = curso;
  professor.email = email;
  professor.disciplina = disciplina;

  res.json({ message: "professor atualizado com sucesso!" });
});

router.delete("/professores/:id", (req, res, next) => {
  const idRecebido = req.params.id;
  const professor = ListaDeprofessores.find((p) => p.id == idRecebido);

  if (!professor) {
    return res.status(404).json({ error: "pessoa não encontrada!" });
  }

  professor = ListaDeprofessores.filter((p) => p.id != idRecebido);

  res.json({ message: "pessoa excluída com sucesso!" });
});

module.exports = router;