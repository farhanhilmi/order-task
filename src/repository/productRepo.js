import Product from '../models/product.js';

const getProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      resolve(product);
    } catch (err) {
      reject(err);
    }
  });
};

const getListProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.find();
      resolve(products);
    } catch (err) {
      reject(err);
    }
  });
};

const addProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const products = await Product.create(data);
      resolve(products);
    } catch (err) {
      reject(err);
    }
  });
};

const updateProductQty = (id, orderedQty, { session }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productQty = await Product.findOneAndUpdate(
        {
          _id: id,
        },
        [
          {
            $set: {
              quantity: {
                $subtract: ['$quantity', orderedQty],
              },
            },
          },
        ],
        // { new: true, select: { price: 1, quantity: 1, _id: 1 }, session },
        { session },
      );
      resolve(productQty);
    } catch (error) {
      reject(error);
    }
  });
};

const checkProductsAvailable = (productIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productAvailable = await Product.aggregate([
        {
          $match: {
            _id: {
              $in: productIds,
            },
          },
        },
        {
          $group: {
            _id: null,
            docs: {
              $push: {
                _id: '$$ROOT._id',
                price: '$$ROOT.price',
                quantity: '$$ROOT.quantity',
              },
            },
          },
        },
        {
          $addFields: {
            productIds: '$docs._id',
          },
        },
        {
          $project: {
            result: {
              $cond: {
                if: {
                  $eq: [productIds, '$productIds'],
                },
                then: '$docs',
                else: null,
              },
            },
          },
        },
      ]);
      resolve(productAvailable[0]);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getProductById,
  getListProduct,
  addProduct,
  checkProductsAvailable,
  updateProductQty,
};
