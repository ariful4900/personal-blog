require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk')


//Import Files
const setMiddlewares = require('./middleware/middlewares');

const setRoutes = require('./routes/routes')

 


const PORT = process.env.PORT || 4000

const MONGO_URL = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nine7.mongodb.net/blogData?retryWrites=true&w=majority`

// console.log(process.env.NODE_ENV);

const app = express();



//setup View Engine

app.set('view engine', 'ejs')
app.set('views', 'views')




//Using Routes From Route Directory
setMiddlewares(app)
setRoutes(app)

app.use((req, res, next) => {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('pages/error/404', { flashMessage: {} })
    }
    console.log(chalk.red.inverse(error.message));
    console.log(error)
    res.render('pages/error/500', { flashMessage: {} })
})


mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log(chalk.white('Database Connected'))
        app.listen(PORT, () => {
            console.log(chalk.blueBright.inverse(`Server is running on PORT ${PORT}`))
        });
    }).catch(e => {
        return console.log(e)
    })



//23.04 complite