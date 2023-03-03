import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceInstance } from '../domain/service-instance';
import { ServiceInstanceService } from '../domain/service-instance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss'],
})
export class EditServiceComponent implements OnInit {
  @Input() serviceInstance?: ServiceInstance;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceInstanceService: ServiceInstanceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.serviceInstanceService
      .getServiceInstance(id)
      .subscribe(serviceInstance => (this.serviceInstance = serviceInstance));

    //TODO: add status settings
    //TODO: add image upload
    this.form = this.formBuilder.group({
      name: [
        this.serviceInstance?.name,
        Validators.required,
      ],
      url: [
        this.serviceInstance?.url,
        Validators.required,
      ],
      version: [
        this.serviceInstance?.version,
        Validators.required,
      ],
      icon: [
        this.serviceInstance?.icon,
        Validators.required,
      ],
      statusCheckEnabled: [
        false,
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.serviceInstance = {
      ...this.serviceInstance,
      ...this.form.value,
    };

    if (this.serviceInstance) {
      this.serviceInstanceService.saveServiceInstance(this.serviceInstance);
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Service successfully saved',
      life: 2000,
    });

    void this.router.navigate(['/']);
  }
}
