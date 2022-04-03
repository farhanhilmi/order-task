import productRepo from '../repository/productRepo.js';
import grpc from '@grpc/grpc-js';

export default async (call, callback) => {
  try {
    const { _id } = call.request;
    const quantity = await productRepo.checkQty(_id);
    if (!quantity)
      callback({
        code: 400,
        message: 'Product not available',
        status: grpc.status.NOT_FOUND,
      });
    callback(null, quantity);
  } catch (err) {
    callback(err);
  }
};
