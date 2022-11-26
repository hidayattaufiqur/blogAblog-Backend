const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.use(function (_, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.get('/blog', (req, res) => {
    Article.find({}).then((article) => {
        res.send(article);
    })
});

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article })
})  

router.get('/edit/:id', async (req, res) => {
    Article.findById(req.params.id).then((article) => {
        res.send(article)
    })  
})

router.get('/blog/:id', async (req, res) => {
    Article.findById(req.params.id).then((article) => {
        res.send(article)
    })
})

router.delete('/blog/:id', async (req,res) => {
    Article.findByIdAndDelete(req.params.id).then(() => {
        res.send('Success')
    })
})

router.post('/blog/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/blog/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title || article.title
        article.author = req.body.author || article.author
        article.description = req.body.description || article.description
        article.content = req.body.content || article.content
        try {
            article = await article.save()
            res.send(article)
        } catch (e) {
            res.send(e)
        }
    }
}

module.exports = router
