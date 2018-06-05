'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const booksController = require('./controllers/books');


const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);
router.get('/books', booksController.books);

module.exports = router;
