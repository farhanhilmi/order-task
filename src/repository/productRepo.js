import Product from '../models/product.js';

const getProductById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      resolve(product);
    } catch (err) {
      reject(err);
    }
  });
};

const getListProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find();
      resolve(products);
    } catch (err) {
      reject(err);
    }
  });
};

export default { getProductById, getListProduct };
