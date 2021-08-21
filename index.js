const express = require("express");
const app = express();
const port = 3000;
const filmes = [
  {
    id: 1,
    nome: "o jogo da imitação",
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FO_Jogo_da_Imita%25C3%25A7%25C3%25A3o&psig=AOvVaw09JdFUnbVAuJW5oi51Xuxq&ust=1629586085819000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjTzrLXwPICFQAAAAAdAAAAABAD",
  },
  {
    id: 2,
    nome: "o imitação",
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FO_Jogo_da_Imita%25C3%25A7%25C3%25A3o&psig=AOvVaw09JdFUnbVAuJW5oi51Xuxq&ust=1629586085819000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjTzrLXwPICFQAAAAAdAAAAABAD",
  },
  {
    id: 3,
    nome: "mitação",
    imgUrl:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.wikipedia.org%2Fwiki%2FO_Jogo_da_Imita%25C3%25A7%25C3%25A3o&psig=AOvVaw09JdFUnbVAuJW5oi51Xuxq&ust=1629586085819000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPjTzrLXwPICFQAAAAAdAAAAABAD",
  },
];
// validações
const getFilmesValidos = () => filmes.filter(Boolean);
const getFilmesById = (id) => getFilmesValidos().find((filme) => filme.id == id);
const getIndexByFilme = (id) => getFilmesValidos().findIndex((filme) => filme.id == id);
app.use(express.json()); //falar paras reqs do express trabalharem com json

// Rota para cadastro de um novo filmes
// CREATE = POST
app.post("/filmes", (req, res) => {
  const filme = req.body;
  if (!filme || !filme.nome || !filme.imgUrl) {
    res.status(400).send({ message: "Filme inválido" });
    return;
  }
  const ultimoFilme = filmes[filme.length - 1];
  if (filmes.length) {
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme);
  } else {
    filmes.id = 1;
    filmes.push(filme);
  }
  res.send(`Filme Adicionado com sucesso: ${filme}, O ID do filme é ${id}`);
});
// READ = GET
app.get("/", (req, res) => {
  res.send("<h1>Bem vindos ao site de Filmes</h1>");
});

app.get("/filmes", (req, res) => {
  res.send(getFilmesValidos());
});
app.get("/filmes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filme = getFilmesById(id);
  if (!filme) {
    res.send("Filme não encontrado");
  }
  res.send(filme);
});
// UPDATE = PUT
app.put("/filmes/:id", (req, res) => {
  const id = +req.params.id - 1;
  const filmeIndex = getIndexByFilme(id)
    if(filmeIndex < 0){
        res.status(404).send({
            message: "Filme não encontrado"
        });
        return;
    }
    const novoFilme = req.body;
    if(!Object.keys(novoFilme).length) {
        res.status(400).send({ message: 'body está vazio'});
        return;
    }
    if (!novoFilme || !novoFilme.nome || !novoFilme.imgUrl){
        res.send(400).send({message = 'Filme invalid, try again'});
        return;
    }
    const filme = getFilmesById(id);
    filmes[filmeIndex] = {
        ...filme,
        ...novoFilme,
        
    }
    res.send(filmes[filmeIndex]);
});
// DELETE = DELETE
app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;
  const filmeIndex = getIndexByFilme(id);
  if(filmeIndex < 0 ){
    res.status(404).send({
      message: "Filme nao encontrado, tente novamente."
    });
    return;
  }
  filmes.splice(filmeIndex, 1);
  res.send({
    message: "Filme removido com sucesso"
  });
});


app.listen(port, () => {
  console.log(`app rodando em http://localhost:${port}`);
});
