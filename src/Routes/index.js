const express = require('express');
const app = express();

//Controllers
const AgendaController = require('../Controllers/AgendaController');

//routes
app.get('/agenda/all', AgendaController.index); //GET ALL
app.post('/agenda/add', AgendaController.store); //CREATE ONE
app.get('/agenda/:id', AgendaController.show); //GET ONE
app.post('/agenda/:id', AgendaController.update); //UPDATE
app.delete('/agenda/:id', AgendaController.delete); //DELETE

//exports
module.exports = app;