const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://alfb:omnistack@cluster0-yozh7.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(3333); // access through localhost:3333
