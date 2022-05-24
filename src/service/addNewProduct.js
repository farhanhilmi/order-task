import productRepo from '../repository/productRepo.js';

const addNewProduct = async (data) => {
  try {
    return await productRepo.addProduct(data);
  } catch (err) {
    return err;
  }
};

export default addNewProduct;
