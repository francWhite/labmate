import { Pipe, PipeTransform } from '@angular/core';
import { Status } from './domain/status';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(value: Status): string {
    if (value === Status.Alive) {
      return 'success';
    }

    if (value === Status.Inactive) {
      return 'warning';
    }

    return 'danger';
  }
}
