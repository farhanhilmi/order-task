import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import mongoDBConnection from './database/mongodb.js';
import productHandler from './handler/productHandler.js';

// express
import express, { json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerDocument from './docs/swaggerSchema.js';

import config from './config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const PROTO_PATH = './product.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const productPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(productPackage.ProductService.service, {
  getProduct: productHandler.getProductById,
  addProduct: productHandler.addProduct,
  getAllProduct: productHandler.getProducts,
  isProductsAvailable: productHandler.isProductsAvailable,
  checkAndUpdateProductQty: productHandler.checkAndUpdateProductQty,
});

server.bindAsync(
  config.app.host,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    mongoDBConnection.connect();

    server.start();
    app.listen(config.app.port);
    console.log(`Server running at ${config.app.host}`);
  },
);
