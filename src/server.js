const express = require('express')
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://victor:victorlima2003@cluster0-5pkza.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true  } );

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log('Rodando...')
});