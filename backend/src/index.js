const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb+srv://administrator:<password/>@devclusterpvpd-dzi5a.gcp.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE
// Tipos de parâmetnros:
// - Query Params: request.query (Filtros, ordenação, paginação, ...)
// - Route Params: request.params (identificar um recurso na alteração ou remoção)
// - Body: request.body (Dados para criação ou alteração de um registro)


//MongoDB (Não-relacional)

app.listen(3333);
