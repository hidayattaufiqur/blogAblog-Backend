const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const Form = require('./models/mail')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const app = express()

mongoose.connect('URI'), 
{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true } )

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));

app.use('/articles', articleRouter)
app.use('/mail', Form)

app.listen(5000)
