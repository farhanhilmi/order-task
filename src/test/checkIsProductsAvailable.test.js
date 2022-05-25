import { jest } from '@jest/globals';
import mongo from '../utils/mongo.js';

import getAllProduct from '../service/getAllProduct.js';
import checkisProductsAvailable from '../service/checkisProductsAvailable.js';

describe('Product Service | Check Is Products Available', () => {
  it('return available products in array object with property of price, quantity, _id', async () => {
    const products = await getAllProduct();
    const productIds = [];
    for (let i = 0; i < products.length; i++) {
      if (i > 1) break;
      productIds.push(products[i]._id);
    }

    const { result } = await checkisProductsAvailable(productIds);
    expect(result).toBeInstanceOf(Array);
    expect(result[0]).toBeInstanceOf(Object);
    expect(result[0]._id).toBeTruthy();
    expect(result[0].price).toBeTruthy();
    expect(result[0].quantity).toBeTruthy();
  });

  it('should return object with _id & result null because there is a product not found', async () => {
    const products = await getAllProduct();
    const productIds = [mongo.generateObjectId()];
    for (let i = 0; i < products.length; i++) {
      if (i > 1) break;
      productIds.push(products[i]._id);
    }

    const { _id, result } = await checkisProductsAvailable(productIds);
    expect(_id).toBeNull();
    expect(result).toBeNull();
  });
});
