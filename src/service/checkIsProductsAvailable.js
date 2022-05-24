import productRepo from '../repository/productRepo.js';
import mongo from '../utils/mongo.js';

const isProductsAvailable = async (productsId) => {
  try {
    const ids = productsId.map((id) => mongo.toObjectId(id));
    return await productRepo.checkProductsAvailable(ids);
  } catch (err) {
    return err;
  }
};

export default isProductsAvailable;
