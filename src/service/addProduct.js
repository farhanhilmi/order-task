import productRepo from '../repository/productRepo.js';

const addProduct = async (call, callback) => {
  try {
    const data = call.request;
    const product = await productRepo.addProduct(data);
    if (!product) callback(null, {});
    callback(null, product);
  } catch (err) {
    console.log('DADAD: ', err);
    callback(err);
  }
};

export default addProduct;
