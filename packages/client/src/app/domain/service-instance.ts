import { Status } from './status';
import { StatusCheckConfiguration } from './status-check-configuration';

export interface ServiceInstance {
  id: string;
  name: string;
  url: string;
  iconUrl?: string;
  version?: string;
  status: Status;
  statusCheckConfiguration: StatusCheckConfiguration;
}
