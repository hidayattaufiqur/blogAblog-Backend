const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const articleRouter = require('./articles')

router.get('/blog', (req, res) => {
    Article.find({}).then((article) => {
        res.send(article);
    })
});