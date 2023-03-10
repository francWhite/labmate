import { Status } from './status';
import { StatusCheckConfiguration } from './status-check-configuration';

export interface ServiceInstance {
  _id: string;
  name: string;
  url: string;
  icon?: string;
  version?: string;
  status: Status;
  statusCheckConfiguration?: StatusCheckConfiguration;
}
