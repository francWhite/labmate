import { Injectable } from '@angular/core';
import { ServiceInstance } from './service-instance';
import { Observable, of } from 'rxjs';
import { Status } from './status';

@Injectable({
  providedIn: 'root',
})
export class ServiceInstanceService {
  private dummyImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnf02hHy_OH3A-yFuRGkAVm6vtaiDzax1Ntw&usqp=CAU';

  private SERVICES: ServiceInstance[] = [
    {
      id: '5f7248dd-dcb6-4466-b9c1-682c392e87aa',
      name: 'Plex',
      icon: this.dummyImage,
      version: '1.23.4',
      status: Status.Alive,
    },
    {
      id: '4908bb41-116a-491c-a687-f1231bea769a',
      name: 'Sonarr',
      icon: this.dummyImage,
      version: '1.55',
      status: Status.Alive,
    },
    {
      id: '6823fecc-a5bf-43fc-b885-297bf5dcfa11',
      name: 'Radarr',
      icon: this.dummyImage,
      version: '7.2.15',
      status: Status.Dead,
    },
    {
      id: '244e794e-7713-49ab-b644-6b261fcffee1',
      name: 'PiHole',
      icon: this.dummyImage,
      version: '1.1.20',
      status: Status.Alive,
    },
  ];

  getServiceInstances(): Observable<ServiceInstance[]> {
    return of(this.SERVICES);
  }
}
