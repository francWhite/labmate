import { Status } from './status';

export interface ServiceInstance {
  //TODO: use uuid
  id: string;
  name: string;
  url: string;
  icon?: string;
  version?: string;
  status: Status;
}
