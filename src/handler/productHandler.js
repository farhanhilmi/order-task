import productService from '../service/productService.js';

const getProduct = (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = productService.getProductById(productId);
    res.status(200).json({ success: true, message: 'ok', data: product });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

const getAllProducts = (req, res, next) => {
  try {
    const products = productService.getAllProduct();
    res.status(200).json({ success: true, message: 'ok', data: products });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ success: false, message: err.message, data: [] });
    } else {
      next(err);
    }
  }
};

export default { getAllProducts, getProduct };
