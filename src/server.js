import mongoose from 'mongoose';
import config from './config/index.js';

import app from './app.js';

try {
  await mongoose
    .connect(config.db.uri)
    .then(() => console.log('Connected to DB'));
  app.listen(8000, () => {
    console.log('Server running on port 8000');
  });
} catch (err) {
  console.log(err);
}
