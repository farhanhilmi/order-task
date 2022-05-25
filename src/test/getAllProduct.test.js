import { jest } from '@jest/globals';
import mongo from '../utils/mongo.js';

import getAllProduct from '../service/getAllProduct.js';
import getProductByProductId from '../service/getProductByProductId.js';
import addNewProduct from '../service/addNewProduct.js';

describe('Product Service | Add New Product', () => {
  it('should store a new product with correct property', async () => {
    const newProduct = {
      name: 'apple',
      quantity: 50,
      description: 'ladkald',
      price: 10000,
    };
    const product = await addNewProduct(newProduct);
    expect(product).toMatchSnapshot();
    expect(product.name).toBeTruthy();
    expect(product.quantity).toBeTruthy();
    expect(product.description).toBeTruthy();
    expect(product.price).toBeTruthy();
  });

  it('should return an error message due to missing field', async () => {
    const newProduct = {
      name: 'apple',
      quantity: 50,
      // description: 'ladkald',
      price: 10000,
    };
    const products = await addNewProduct(newProduct);
    const throwError = () => {
      throw new TypeError(products);
    };
    expect(throwError).toThrow(`Error: description is a required field`);
  });

  it('should return an error message due to wrong input type', async () => {
    const newProduct = {
      name: 'apple',
      quantity: '50k',
      description: 'ladkald',
      price: 10000,
    };
    const products = await addNewProduct(newProduct);
    const throwError = () => {
      throw new TypeError(products);
    };
    expect(throwError).toThrow(`Error: quantity should be a type of 'number'`);
  });
});

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
