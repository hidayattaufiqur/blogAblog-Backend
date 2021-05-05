const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')

const app = express()

mongoose.connect('URI', 
{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true } )

app.use('/articles', articleRouter)


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
// app.listen(5000)

