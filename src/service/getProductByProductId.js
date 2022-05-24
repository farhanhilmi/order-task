import productRepo from '../repository/productRepo.js';

const getProductById = async (id) => {
  try {
    return await productRepo.getProductById(id);
  } catch (err) {
    return err;
  }
};

export default getProductById;
