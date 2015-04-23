import {MongoClient} from 'mongodb';

export default () => new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost:27017/savoy', (err, db) => {
    if (err) {
      console.error('Mongoerror', err);
      reject(err);
    } else resolve(db);
  });
});
