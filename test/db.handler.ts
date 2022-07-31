/** @format */

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // eslint-disable-line

const dbName: string = 'test';
let mongod: MongoMemoryServer;

jest.setTimeout(30000);

/**
 * Connect to the in-memory database.
 */
export const connectDb = async (): Promise<void> => {
  if (!mongod) {
    mongod = await MongoMemoryServer.create();
  }
  const uri = mongod.getUri();
  await mongoose.connect(uri, { dbName });
};

/**
 * Drops database, closes the connection and stops mongo.
 */
export const closeDb = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};
