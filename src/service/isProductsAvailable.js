import productRepo from '../repository/productRepo.js';

const isProductsAvailable = async (call, callback) => {
  try {
    const { listProductQty } = call.request;

    // const product = await productRepo.checkIsProductsAvailable(listProductQty);
    await Promise.all(
      listProductQty.map(async (prod) => {
        const item = await productRepo.checkIsProductsAvailable({
          _id: prod._id,
          quantity: prod.quantity,
        });

        if (!item[0]?.isAvailable) {
          throw new Error(`product dengan id ${item[0]?._id} tidak tersedia`);
        }
        return item[0];
      }),
    );
    callback(null, { status: 'available' });
  } catch (err) {
    callback(err);
  }
};

export default isProductsAvailable;
