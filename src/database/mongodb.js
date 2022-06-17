import mongoose from 'mongoose';
import config from '../config/index.js';

export default {
  connect: () => {
    mongoose.connect(config.db.uri);

    mongoose.connection.on('connected', function () {
      console.log('connected to DB');
    });

    mongoose.connection.on('error', function (err) {
      console.log('Mongoose connection has occured ' + err + ' error');
    });

    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose connection is disconnected');
    });

    process.on('SIGINT', function () {
      mongoose.connection.close(function () {
        console.log(
          'Mongoose connection is disconnected due to application termination',
        );
        // process.exit(0)
      });
    });
  },
};
