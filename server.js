const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const bodyParser = require('body-parser')
require("dotenv").config();

const app = express()

mongoose.connect(process.env.URI, 
{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true } )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/articles', articleRouter)

app.listen(process.env.PORT, function(){
    console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
});

