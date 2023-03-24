import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceInstance } from '../domain/service-instance';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ServiceInstanceService } from '../domain/service-instance.service';

@Component({
  selector: 'app-service-tile',
  templateUrl: './service-tile.component.html',
  styleUrls: ['./service-tile.component.scss'],
  providers: [ConfirmationService],
})
export class ServiceTileComponent {
  @Input() serviceInstance?: ServiceInstance;
  @Output() serviceInstanceDeleted = new EventEmitter();

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private serviceInstanceService: ServiceInstanceService
  ) {}

  cardOnClick(): void {
    if (!this.serviceInstance?.url) {
      return;
    }
    window.location.href = this.serviceInstance.url;
  }

  deleteOnClick(event: Event) {
    event.stopPropagation();

    this.confirmationService.confirm({
      message: 'Do you want to delete this service?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger w-8rem',
      acceptIcon: 'pi pi-trash',
      rejectButtonStyleClass: 'p-button-outlined w-8rem',
      defaultFocus: 'reject',
      dismissableMask: true,
      accept: () => {
        this.serviceInstanceService.deleteServiceInstance(this.serviceInstance?.id ?? '').subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Service deleted' });
          this.serviceInstanceDeleted.emit();
        });
      },
    });
  }
}
