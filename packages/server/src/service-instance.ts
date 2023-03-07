import { Status } from './status';
import { StatusCheckConfiguration } from './status-check-configuration';
import { ObjectId } from 'mongodb';

export interface ServiceInstance {
  _id?: ObjectId;
  name: string;
  url: string;
  icon?: string;
  version?: string;
  status: Status;
  statusCheckConfiguration: StatusCheckConfiguration;
}
