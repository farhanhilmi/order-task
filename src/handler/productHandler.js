import grpc from '@grpc/grpc-js';

import {
  getAllProduct,
  getProductByProductId,
  addNewProduct,
  checkIsProductsAvailable,
  checkAndUpdateProductQuantity,
} from '../service/index.js';

const getProducts = async (call, callback) => {
  try {
    const products = await getAllProduct();
    if (!products) callback(null, { products: [] });
    callback(null, { products });
  } catch (err) {
    callback(err);
  }
};

const getProductById = async (call, callback) => {
  try {
    const { _id } = call.request;
    const product = await getProductByProductId(_id);
    if (!product) callback(null, {});
    callback(null, product);
  } catch (err) {
    callback(err);
  }
};

const addProduct = async (call, callback) => {
  try {
    const data = call.request;
    const product = addNewProduct(data);
    if (!product) callback(null, {});
    callback(null, product);
  } catch (err) {
    callback(err);
  }
};

const isProductsAvailable = async (call, callback) => {
  try {
    const { productsId } = call.request;
    const available = await checkIsProductsAvailable(productsId);

    if (!available.result) {
      callback({
        code: 5,
        message: 'Product not available',
        status: grpc.status.NOT_FOUND,
      });
    }

    callback(null, { status: 'Products available' });
  } catch (err) {
    callback(err);
  }
};

const checkAndUpdateProductQty = async (call, callback) => {
  try {
    const { products } = call.request;

    const listProductQty = await checkAndUpdateProductQuantity(products);
    if (listProductQty instanceof Error) {
      throw new Error(listProductQty.message);
    }
    callback(null, { listProductQty });
  } catch (err) {
    callback(err);
  }
};

export default {
  getProducts,
  getProductById,
  addProduct,
  isProductsAvailable,
  checkAndUpdateProductQty,
};
