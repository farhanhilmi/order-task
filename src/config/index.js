import dotenv from 'dotenv';

dotenv.config();

const { HOST, SERVER_PORT, MONGODB_URI } = process.env;

const config = {
  app: {
    port: `${HOST}:${SERVER_PORT}` | 8000,
  },
  db: {
    uri: MONGODB_URI,
  },
};

export default config;
