import * as mongodb from 'mongodb';
import { ServiceInstance } from './service-instance';

export const collections: {
  serviceInstances?: mongodb.Collection<ServiceInstance>;
} = {};

export async function connectToDatabase(uri: string) {
  console.log('Connecting to database...');

  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('labmate');
  collections.serviceInstances = db.collection<ServiceInstance>('serviceInstances');
}
