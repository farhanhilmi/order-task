import mongo from '../utils/mongo.js';

import getAllProduct from '../service/getAllProduct.js';
import getProductByProductId from '../service/getProductByProductId.js';

describe('Product Service | Get Product', () => {
  it('should return all products available in array', async () => {
    const products = await getAllProduct();
    expect(products).toBeInstanceOf(Array);
  });

  it('should have valid objectID', async () => {
    const products = await getAllProduct();
    expect(products[0]).toHaveProperty('_id');
    expect(mongo.objectId.isValid(products[0])).toBeTruthy();
  });

  it('should return object of product', async () => {
    const products = await getAllProduct();
    const product = await getProductByProductId(products[0]._id);
    expect(product).toBeInstanceOf(Object);
  });

  it('should throw an error due to missing parameter productId', async () => {
    const product = await getProductByProductId();
    const throwError = () => {
      throw new TypeError(product);
    };
    expect(throwError).toThrow(`Error: id parameter is missing`);
  });

  it('should return null because productId not found', async () => {
    const product = await getProductByProductId(mongo.generateObjectId());
    expect(product).toBeNull();
  });
});
