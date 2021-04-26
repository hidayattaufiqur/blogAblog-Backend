const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')

const app = express()

mongoose.connect('URI', 
{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true } )

app.use('/articles', articleRouter)

app.listen(5000)
