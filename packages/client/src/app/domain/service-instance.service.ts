import { Injectable } from '@angular/core';
import { ServiceInstance } from './service-instance';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceInstanceService {
  private api_url = `http://${environment.api_hostname}:${environment.api_port}/api/services`;

  constructor(private httpClient: HttpClient) {}

  getServiceInstances(): Observable<ServiceInstance[]> {
    return this.httpClient.get<ServiceInstance[]>(this.api_url);
  }

  getServiceInstance(id: string): Observable<ServiceInstance | undefined> {
    return this.httpClient.get<ServiceInstance>(`${this.api_url}/${id}`);
  }

  createServiceInstance(serviceInstance: ServiceInstance): Observable<string> {
    return this.httpClient.post(this.api_url, serviceInstance, { responseType: 'text' });
  }

  updateServiceInstance(serviceInstance: ServiceInstance): Observable<string> {
    return this.httpClient.put(`${this.api_url}/${serviceInstance._id}`, serviceInstance, { responseType: 'text' });
  }

  deleteServiceInstance(id: string): Observable<boolean> {
    return this.httpClient
      .delete<string>(`${this.api_url}/${id}`, { observe: 'response' })
      .pipe(map(response => response.status === 204));
  }
}
