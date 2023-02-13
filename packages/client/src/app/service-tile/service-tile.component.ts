import { Component, Input } from '@angular/core';
import { ServiceInstance } from '../domain/service-instance';

@Component({
  selector: 'app-service-tile',
  templateUrl: './service-tile.component.html',
  styleUrls: ['./service-tile.component.scss'],
})
export class ServiceTileComponent {
  @Input() serviceInstance?: ServiceInstance;

  cardOnClick(): void {
    console.log('card click');
  }

  editOnClick(event: Event) {
    event.stopPropagation();
    console.log('edit click');
  }

  deleteOnClick(event: Event) {
    event.stopPropagation();
    console.log('delete click');
  }
}
