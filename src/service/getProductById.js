import productRepo from '../repository/productRepo.js';

const getProductById = async (call, callback) => {
  try {
    const { _id } = call.request;
    const product = await productRepo.getProductById(_id);
    if (!product) callback(null, {});
    callback(null, product);
  } catch (err) {
    callback(err);
  }
};

export default getProductById;
