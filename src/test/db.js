import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.promise = global.Promise;

let mongoServer;

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // replicaSet: 'rs',
};

const connect = async () => {
  await mongoose.disconnect();

  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
// import { jest } from '@jest/globals';

// export const setupDB = () => {
//   beforeAll(async () => {
//     jest.setTimeout(60000);
//     await connect();
//   });

//   beforeEach(async () => {
//     await seedDatabase();
//   });

//   afterEach(async () => {
//     await clear();
//   });

//   afterAll(async () => {
//     await close();
//   });
// };

export default {
  connect,
  close,
  clear,
};
