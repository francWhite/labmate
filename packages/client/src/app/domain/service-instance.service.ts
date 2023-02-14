import { Injectable } from '@angular/core';
import { ServiceInstance } from './service-instance';
import { Observable, of } from 'rxjs';
import { Status } from './status';

@Injectable({
  providedIn: 'root',
})
export class ServiceInstanceService {
  private SERVICES: ServiceInstance[] = [
    {
      id: '5f7248dd-dcb6-4466-b9c1-682c392e87aa',
      name: 'Plex',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnf02hHy_OH3A-yFuRGkAVm6vtaiDzax1Ntw&usqp=CAU',
      version: '1.23.4',
      status: Status.Inactive,
    },
    {
      id: '4908bb41-116a-491c-a687-f1231bea769a',
      name: 'Sonarr',
      icon: 'https://forums-sonarr-tv.s3.dualstack.us-east-1.amazonaws.com/original/2X/e/ef4553fe96f04a298ec502279731579698e96a9b.png',
      version: '1.55',
      status: Status.Alive,
    },
    {
      id: '6823fecc-a5bf-43fc-b885-297bf5dcfa11',
      name: 'Radarr',
      icon: 'https://styles.redditmedia.com/t5_3icg7/styles/communityIcon_d0kaqkdtx9261.png',
      version: '7.2.15',
      status: Status.Dead,
    },
    {
      id: '244e794e-7713-49ab-b644-6b261fcffee1',
      name: 'PiHole',
      icon: 'https://wp-cdn.pi-hole.net/wp-content/uploads/2016/12/Vortex-R.png',
      version: '1.1.20',
      status: Status.Alive,
    },
    {
      id: 'f702100a-43c0-4f26-a86d-c28653b203ff',
      name: 'JDownloader very very very very long text',
      version: '2',
      status: Status.Alive,
    },
  ];

  getServiceInstances(): Observable<ServiceInstance[]> {
    return of(this.SERVICES);
  }
}
