import productRepo from '../repository/productRepo.js';
import mongo from '../utils/mongo.js';
import grpc from '@grpc/grpc-js';

const isProductsAvailable = async (call, callback) => {
  try {
    const { productsId } = call.request;
    const ids = productsId.map((id) => mongo.toObjectId(id));

    const available = await productRepo.checkProductsAvailable(ids);

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

export default isProductsAvailable;
