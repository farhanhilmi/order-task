import productRepo from '../repository/productRepo.js';
import { validateProduct } from '../utils/validation.js';

const addNewProduct = async (data) => {
  try {
    const { error } = validateProduct(data);
    if (error) {
      throw new Error(error.details.map((err) => err.message));
    }
    return await productRepo.addProduct(data);
  } catch (err) {
    return err;
  }
};

export default addNewProduct;
