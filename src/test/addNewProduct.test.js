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
