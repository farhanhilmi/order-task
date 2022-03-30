import express, { json, urlencoded } from 'express';

import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/products/', productRoutes);

app.use((req, res, next) => {
  const error = new Error("API endpoint doesn't exist");
  error.status = 404;
  next(error);
});

app.use((error, req, res, _) => {
  res.status(error.status || 500).json({
    success: false,
    data: [],
    message: error.message || 'Internal Server Error',
  });
});

export default app;
