const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("----------# LOG DE REQUISIÇÃO #----------");
  console.log("TIME: ", new Date().toLocaleString());
  console.log("METODO: ", req.method);
  console.log(("ROTA: ", req.route));
});

const Alunos = require("./routes/alunos");
const Professores = require("./routes/professores");
app.use(Alunos);
app.use(Professores);

app.listen(3000, () => {
  console.log("Server running on port: http://localhost:3000");
});
