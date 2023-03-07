import * as mongodb from 'mongodb';
import { ServiceInstance } from './service-instance';
import { Status } from './status';

export const collections: {
  serviceInstances?: mongodb.Collection<ServiceInstance>;
} = {};

export async function connectToDatabase(uri: string) {
  console.log('Connecting to database...');

  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('labmate');
  collections.serviceInstances = db.collection<ServiceInstance>('serviceInstances');

  const collectionExists = (await db.listCollections().toArray()).find(c => c.name === 'serviceInstances');
  if (!collectionExists) {
    console.log('First start, creating dummy data...');
    await collections.serviceInstances.insertOne({
      name: 'GitHub',
      icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
      version: '2023',
      status: Status.Alive,
      url: 'https://github.com/francWhite/labmate',
      statusCheckConfiguration: {
        enabled: true,
        interval: 60,
        checkUrl: 'https://github.com/',
      },
    });
  }
}
