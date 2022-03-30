import express from 'express';

import handler from '../handler/productHandler.js';

const router = express.Router();

router.post('/', handler.getAllProducts);
router.get('/:productId', handler.getProduct);

export default router;
