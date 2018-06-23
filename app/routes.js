'use strict';

const Router = require('koa-router');
const homeController = require('./controllers/home');
const booksController = require('./controllers/book');


const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

router.post('/book', booksController.insert);
router.get('/book', booksController.find);
router.put('/book/:id', booksController.updateById);
router.delete('/book/:id', booksController.remove);
router.get('/book/:id', booksController.findById);

module.exports = router;
