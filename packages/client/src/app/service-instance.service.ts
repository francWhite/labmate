import {Injectable} from '@angular/core';
import {ServiceInstance} from './service-instance';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceInstanceService {
  private SERVICES: ServiceInstance[] = [
    {id: '5f7248dd-dcb6-4466-b9c1-682c392e87aa', name: 'Plex'},
    {id: '4908bb41-116a-491c-a687-f1231bea769a', name: 'Sonarr'},
    {id: '6823fecc-a5bf-43fc-b885-297bf5dcfa11', name: 'Radarr'},
    {id: '244e794e-7713-49ab-b644-6b261fcffee1', name: 'PiHole'},
  ];

  getServiceInstances() : Observable<ServiceInstance[]> {
    return of(this.SERVICES);
  }
}
