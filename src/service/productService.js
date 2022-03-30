import ProductRepo from '../repository/productRepo.js';

const getAllProduct = async () => {
  return await ProductRepo.getListProduct();
};

const getProductById = async (id) => {
  return await ProductRepo.getProductById(id);
};

export default { getProductById, getAllProduct };
