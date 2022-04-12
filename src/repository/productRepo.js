import Product from '../models/product.js';
import mongo from '../utils/mongo.js';

const getProductById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);
      resolve(product);
    } catch (err) {
      console.log(err);
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

const checkQty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productQty = await Product.findOne({ _id: id }, 'quantity');
      resolve(productQty);
    } catch (error) {
      reject(error);
    }
  });
};

const checkIsProductsAvailable = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('products', products);
      // const productAvailable = await Product.find(
      //   {
      //     _id: {
      //       $in: [
      //         ObjectId('6244321d37826bd7e91c00da'),
      //         ObjectId('6249656f6d6623c1935bb3c1'),
      //       ],
      //     },
      //   },
      //   ['quantity', '_id'],
      // ).map(function (prod) {
      //   if (prod.quantity < 10) {
      //     throw new Error(`Product id ${prod._id} tidak tersedia`);
      //   }
      //   return { _id: prod._id };
      // });

      const productAvailable = await Product.aggregate([
        {
          $match: { _id: mongo.toObjectId(product._id) },
        },
        {
          $project: {
            isAvailable: {
              $cond: {
                if: { $gte: ['$quantity', product.quantity] },
                then: true,
                else: false,
              },
            },
          },
        },
      ]);

      resolve(productAvailable);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getProductById,
  getListProduct,
  addProduct,
  checkQty,
  checkIsProductsAvailable,
};
