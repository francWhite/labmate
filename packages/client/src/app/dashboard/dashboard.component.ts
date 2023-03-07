import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceInstance } from '../domain/service-instance';
import { ServiceInstanceService } from '../domain/service-instance.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  serviceInstances?: ServiceInstance[];
  timeInterval?: Subscription;

  constructor(private serviceInstanceService: ServiceInstanceService) {}

  ngOnInit(): void {
    this.fetchServiceInstances();
    this.timeInterval = interval(5000).subscribe(() => this.fetchServiceInstances());
  }

  fetchServiceInstances() {
    this.serviceInstanceService
      .getServiceInstances()
      .subscribe(serviceInstances => (this.serviceInstances = serviceInstances));
  }

  ngOnDestroy(): void {
    this.timeInterval?.unsubscribe();
  }
}
