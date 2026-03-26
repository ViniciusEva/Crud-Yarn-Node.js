const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

//Crud -> CREATE, READ, UPDATE, DELETE

const cursos = ['Node JS', 'JavaScript', 'React Native'];


//===================================================================================
//===================================================================================


//Middleware Global -> Mensagens de alterações no CRUD dentro do CMD
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`);

    return next();
})

function checkCurso(req, res, next) {
    if(!req.body.name){
        return res.status(400).json({ error: "Nome do curso é obrigatório"});
    }

    return next();
}

function checkindexCurso(req, res, next) {
    const curso = cursos[req.params.index];

    if(!curso){
        return res.status(400).json({ error: "O curso não Existe"});
    }

    req.curso = curso;

    return next();
}


//===================================================================================
//===================================================================================



// http://localhost:3000/cursos
server.get('/cursos', (req, res,) => {
    return res.json(cursos);
});

//http://localhost:3000/cursos/0
server.get('/cursos/:index', checkindexCurso, (req, res) => {
    
    return res.json(req.curso);
    
});

//Criando um novo Curso
// http://localhost:3000/cursos criar um JSON no body com method POST no insomnia
server.post('/cursos', checkCurso, (req, res) =>{
    const { name } = req.body;
    cursos.push(name); 

    return res.json(cursos);
});

//Atualizando um curso
// http://localhost:3000/cursos/1 No Json do Body, atualizamos o array cursos
server.put('/cursos/:index', checkCurso, checkindexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);

});

//Excluindo algum Curso
//http://localhost:3000/cursos/1 Delete, NO BODY no Json
server.delete('/cursos/:index', checkindexCurso, (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.json(cursos);
})

server.listen(3000)