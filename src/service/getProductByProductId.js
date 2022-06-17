import productRepo from '../repository/productRepo.js';

const getProductById = async (id) => {
  try {
    if (!id) throw new Error('id parameter is missing');
    return await productRepo.getProductById(id);
  } catch (err) {
    return err;
  }
};

export default getProductById;
