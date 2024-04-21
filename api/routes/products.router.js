const express = require('express');
const ProductsService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handle');
const {
  createProductsSchema,
  updateProductsSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.post(
  '/',
  validatorHandler(createProductsSchema, 'body'),
  async (req, res) => {
    const body = req.body;

    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct,
    });
  },
);

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);

      res.status(200).json({ data: product });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(updateProductsSchema, 'params'),
  validatorHandler(updateProductsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'update ',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);

  res.json({
    message: 'borrauw ',
    data: product,
  });
});

module.exports = router;
