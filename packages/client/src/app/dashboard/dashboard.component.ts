import {Component, OnInit} from '@angular/core';
import {ServiceInstance} from '../service-instance';
import {ServiceInstanceService} from '../service-instance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  serviceInstances?: ServiceInstance[];


  constructor(private serviceInstanceService: ServiceInstanceService) {
  }

  ngOnInit(): void {
    this.serviceInstanceService
      .getServiceInstances()
      .subscribe(serviceInstances => this.serviceInstances = serviceInstances);
  }
}
