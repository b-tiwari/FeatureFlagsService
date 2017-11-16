import * as mongoose from 'mongoose';

import AppConfig from './app-config';

// remove the mongoose promise warning
(<any>mongoose).Promise = global.Promise;

try {
  mongoose.connect(AppConfig.MONGO_URL);
} catch (err) {
  mongoose.createConnection(AppConfig.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });
