import productRepo from '../repository/productRepo.js';
import Product from '../models/product.js';
import mongo from '../utils/mongo.js';

export default async (products) => {
  const session = await Product.startSession();
  try {
    session.startTransaction();

    const productIds = await products.map((prod) => mongo.toObjectId(prod._id));
    const { result: productAvailable } =
      await productRepo.checkProductsAvailable(productIds);

    if (!productAvailable) {
      throw new Error(`Product not found`);
    }

    for (let i = 0; i < productAvailable.length; i++) {
      if (productAvailable[i].quantity < products[i].orderedQty) {
        throw new Error(
          `insufficient quantity for productId ${products[i]._id}`,
        );
      }
      await productRepo.updateProductQty(
        products[i]._id,
        products[i].orderedQty,
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();
    return productAvailable;
  } catch (err) {
    if (session.inTransaction) {
      session.abortTransaction();
    }
    return err;
  }
};
