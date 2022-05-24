import dotenv from 'dotenv';

dotenv.config();

const { HOST, SERVER_PORT, MONGODB_URI } = process.env;

const config = {
  app: {
    port: `${HOST}:${SERVER_PORT}`,
  },
  db: {
    uri: MONGODB_URI,
  },
};

export default config;
