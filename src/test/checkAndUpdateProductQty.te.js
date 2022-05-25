import { jest } from '@jest/globals';

import getAllProduct from '../service/getAllProduct.js';
import checkAndUpdateProductQty from '../service/checkAndUpdateProductQty.js';

describe('Product Service | Check And Update Product Qty', () => {
  it('must update product quantity if all products are available', async () => {
    const products = await getAllProduct();
    const orderProduct = [];
    let orderedQty = 2;
    for (let i = 0; i < products.length; i++) {
      if (i > 1) break;
      orderProduct.push({ _id: products[i]._id, orderedQty: orderedQty++ });
    }

    const status = await checkAndUpdateProductQty(orderProduct);
    console.log('status', status);
  });
});
