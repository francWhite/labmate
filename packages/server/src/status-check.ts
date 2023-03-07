import { collections } from './database';
import { ObjectId } from 'mongodb';
import axios from 'axios';
import { Status } from './status';

const statusCheckIntervals = new Map<string, NodeJS.Timeout>();

export function updateStatusCheck(id: string) {
  collections.serviceInstances?.findOne({ _id: new ObjectId(id) }).then(service => {
    if (service?.statusCheckConfiguration.enabled && service.statusCheckConfiguration.interval) {
      const checkUrl = service.statusCheckConfiguration.checkUrl
        ? service.statusCheckConfiguration.checkUrl
        : service.url;
      scheduleCheck(id, checkUrl, service.statusCheckConfiguration.interval);
    } else {
      cancelCheck(id);
    }
  });
}

function scheduleCheck(id: string, url: string, interval: number) {
  console.log(`Scheduling status check for ${url} with interval ${interval}`);
  if (statusCheckIntervals.has(id)) {
    clearInterval(statusCheckIntervals.get(id));
  }

  const intervalId = setInterval(() => {
    console.log(`Checking status of ${url}`);
    axios
      .get(url)
      .then(() => {
        console.log('Service is available');
        updateStatus(id, true);
      })
      .catch(() => {
        updateStatus(id, false);
        console.log('Service is not available');
      });
  }, interval * 1000);

  statusCheckIntervals.set(id, intervalId);
}

function cancelCheck(id: string) {
  if (statusCheckIntervals.has(id)) {
    console.log(`Cancelling status check for ${id}`);
    clearInterval(statusCheckIntervals.get(id));
  }
}

function updateStatus(id: string, available: boolean) {
  const status = available ? Status.Alive : Status.Dead;
  collections.serviceInstances?.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}
