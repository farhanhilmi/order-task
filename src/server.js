import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import mongoDBConnection from './database/mongodb.js';
import {
  getAllProduct,
  getProduct,
  addProduct,
  isProductsAvailable,
  checkAndUpdateProductQty,
} from './service/index.js';
// import config from './config/index.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_PATH = './product.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const productPackage = grpc.loadPackageDefinition(packageDef);

const server = new grpc.Server();
server.addService(productPackage.ProductService.service, {
  getProduct,
  addProduct,
  getAllProduct,
  isProductsAvailable,
  checkAndUpdateProductQty,
});

server.bindAsync(
  '127.0.0.1:7001',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    mongoDBConnection.connect();

    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  },
);
