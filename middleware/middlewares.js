const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config = require('config');


const { bindUserWithRequest } = require('./authMiddleware');
const setLocals = require('./setLocals')

const MONGO_URL = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nine7.mongodb.net/blogData?retryWrites=true&w=majority`

const store = new MongoDBStore({
    uri: MONGO_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()

];


module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}