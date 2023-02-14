import { Status } from './status';

export interface ServiceInstance {
  id: string;
  name: string;
  icon?: string;
  version?: string;
  status: Status;
}
