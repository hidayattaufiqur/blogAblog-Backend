const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/blog', (req, res) => {
    Article.find({}).then((article) => {
        res.send(article);
    })
});

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article })
})  

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    Article.findById(req.params.id).then((article) => {
        res.send(article)
    })  
})

router.get('/blog/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    Article.findOne({ slug: req.params.slug }).then((article) => {
        res.send(article)
    })
})

router.post('/blog/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.delete('/blog/:id', async (req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    Article.findByIdAndDelete(req.params.id).then((article) => {
        res.send('Success')
    })
})

router.put('/blog/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description= req.body.description
        article.markdown= req.body.markdown
        try {
            article = await article.save()
            res.send(article)
        } catch (e) {
            res.send(e)
        }
    }
}

module.exports = router