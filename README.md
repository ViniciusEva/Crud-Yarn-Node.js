# 🚀 Node.js CRUD - Gestão de Cursos

Este projeto é uma API REST funcional desenvolvida para o gerenciamento de cursos. Ele foi criado para demonstrar o uso do **Node.js** com o framework **Express**, utilizando **Yarn** como gerenciador de pacotes e o **Insomnia** para testes de requisições.

---

## 🗺️API Wireframe: Fluxo de Dados

### 📥 Estrutura de Requisições (Insomnia)
```wireframe
+-----------------------------------------------------------------------+
|  MÉTODO |       ROTA (URL)       |     CORPO (JSON)    |   RESPOSTA   |
+---------+------------------------+---------------------+--------------+
|         |                        |                     |              |
|   GET   |  /cursos               |  (Vazio)            |  [Lista All] |
|         |                        |                     |              |
|   GET   |  /cursos/:index        |  (Vazio)            |  {Objeto}    |
|         |                        |                     |              |
|   POST  |  /cursos               |  {"name": "Java"}   |  [Nova Lista]|
|         |                        |                     |              |
|   PUT   |  /cursos/:index        |  {"name": "React"}  |  [Lista Upd] |
|         |                        |                     |              |
|  DELETE |  /cursos/:index        |  (Vazio)            |  [Lista Rem] |
|         |                        |                     |              |
+-----------------------------------------------------------------------+
```

## 📝 Resumo de Código para o README (Seção Wireframe)

```markdown
### 🗺️ Mapa de Rotas (Wireframe)

REQ --> [ Middleware Global ] 
          |
          +--> GET /cursos (Lista tudo)
          |
          +--> [ Middleware checkindexCurso ] --> GET /cursos/:id (Lista um)
          |
          +--> [ Middleware checkCurso ] --> POST /cursos (Cria novo)
          |
          +--> [ Middlewares index + curso ] --> PUT /cursos/:id (Edita)
          |
          +--> [ Middleware checkindexCurso ] --> DELETE /cursos/:id (Deleta)
```

## 💻 Exemplo Visual no Terminal (Logs)
Quando você faz as chamadas no Insomnia, seu terminal do VS Code/CMD mostrará o rastro do Middleware Global:

```bash
    > Servidor Rodando na porta 3000...
    URL CHAMADA: /cursos
    URL CHAMADA: /cursos/1
    URL CHAMADA: /cursos (POST)
```

## 🛠️ Tecnologias e Ferramentas

* **Node.js**: Ambiente de execução.
* **Express**: Framework para roteamento e middlewares.
* **Yarn**: Gerenciador de dependências.
* **Insomnia**: Cliente HTTP para validar os endpoints.

---

## ⚙️ Funcionalidades Implementadas

O projeto cobre as quatro operações básicas do **CRUD**:
1.  **C**reate (POST): Adicionar um novo curso.
2.  **R**ead (GET): Listar todos ou um curso específico.
3.  **U**pdate (PUT): Editar o nome de um curso existente.
4.  **D**elete (DELETE): Remover um curso da lista.

### 🛡️ Middlewares Utilizados

O sistema conta com validações robustas:

* **Middleware Global**: Intercepta todas as rotas e exibe no console a URL que foi chamada, facilitando o log de desenvolvimento.
* **checkCurso**: Validação local para rotas de criação e edição. Verifica se o campo `name` foi enviado no corpo da requisição.
* **checkindexCurso**: Validação local que verifica se o índice (ID) passado na URL realmente existe no array de cursos, evitando erros de "undefined".

---

## 🚀 Como instalar e rodar

1. **Clone este repositório**
2. **Instale as dependências:**
   ```bash
   yarn init -y
   yarn add express
   yarn add nodemon -D
   ```
3. **Inicie o servidor**
    ```bash
    node index.js
    ```
O servidor iniciará na porta 3000.

## 📝 Notas de Implementação
O projeto utiliza um array estático em memória para armazenar os dados:

```javaScript
    const cursos = ['Node JS', 'JavaScript', 'React Native'];
```

Os dados são perdidos sempre que o servidor é reiniciado, o que o torna ideal para testes rápidos de lógica de backend e middlewares.

## ⚠️ Relatório de Erros e Validações (Error Handling)

A API conta com camadas de segurança (Middlewares) que validam os dados antes de processar qualquer operação no CRUD. Abaixo estão os cenários de erro tratados:

### 🔍 Resumo de Validações

| Status | Erro | Gatilho (Causa) | Resposta da API (JSON) |
| :--- | :--- | :--- | :--- |
| **400** | `Bad Request` | Tentar criar/editar sem a chave `name` | `{"error": "Nome do curso é obrigatório"}` |
| **400** | `Bad Request` | Tentar acessar um índice que não existe | `{"error": "O curso não Existe"}` |

---

### 🛠️ Detalhamento dos Middlewares de Erro

#### 1. Middleware: `checkCurso`
Este middleware é aplicado nas rotas **POST** e **PUT**. Ele garante que o corpo da requisição contenha a propriedade obrigatória.
* **Exemplo de erro no Insomnia:** Enviar `{ "curso": "Node" }` em vez de `{ "name": "Node" }`.

#### 2. Middleware: `checkindexCurso`
Aplicado em todas as rotas que recebem `:index` (**GET individual, PUT e DELETE**). Ele verifica se o array `cursos[index]` possui um valor válido.
* **Exemplo de erro no Insomnia:** Tentar deletar o curso na posição `99` quando só existem 3 cursos cadastrados.

---

### 🔄 Fluxo de Exceção

Quando um erro é detectado, a requisição é interrompida imediatamente:
1. O cliente faz a chamada via **Insomnia**.
2. O **Middleware** intercepta e valida o dado.
3. Se o dado for inválido, o `return res.status(400)` corta o fluxo.
4. O código principal da rota (ex: `.push` ou `.splice`) **nunca é executado**, protegendo a integridade do array.

---

## 🤝 Como Contribuir

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua Feature (`git checkout -b feature/NovaFeature`).
3. Faça o **Commit** de suas alterações (`git commit -m 'Adicionando uma nova feature incrível'`).
4. Faça o **Push** para a Branch (`git push origin feature/NovaFeature`).
5. Abra um **Pull Request**.

---

## 👤 Autor

**Vinicius Evangelista de Souza** 📍 Suzano, SP - Brasil  
🎓 Estudante de Análise e Desenvolvimento de Sistemas (Fatec Ferraz de Vasconcelos)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
