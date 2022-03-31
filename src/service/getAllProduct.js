import productRepo from '../repository/productRepo.js';

const getProducts = async (call, callback) => {
  try {
    const products = await productRepo.getListProduct();
    if (!products) callback(null, { products: [] });
    callback(null, { products });
  } catch (err) {
    callback(err);
  }
};

export default getProducts;
