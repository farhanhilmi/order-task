import productRepo from '../repository/productRepo.js';

const getProducts = async () => {
  try {
    return await productRepo.getListProduct();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default getProducts;
