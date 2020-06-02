const express = require('express');
const routes = express.Router();

const ProductsController = require('./Controllers/ProductsController')
  
routes.get('/', ProductsController.get);
routes.get('/:slug', ProductsController.getBySlug);
routes.get('/admin/:id', ProductsController.getById);
routes.get('/tags/:tag', ProductsController.getByTag);
routes.post('/', ProductsController.post);
routes.put('/:id', ProductsController.put);
routes.delete('/', ProductsController.delete);

module.exports = routes;