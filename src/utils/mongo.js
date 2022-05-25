import mongoose from 'mongoose';

export default {
  toObjectId: (id) => mongoose.Types.ObjectId(id),
  objectId: mongoose.Types.ObjectId,
  generateObjectId: () => new mongoose.Types.ObjectId(),
};
