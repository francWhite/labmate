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
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceInstanceService: ServiceInstanceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadServiceInstance();
    this.buildForm();
  }

  loadServiceInstance() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.serviceInstanceService
      .getServiceInstance(id)
      .subscribe(serviceInstance => (this.serviceInstance = serviceInstance));
  }

  buildForm() {
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
      icon: [this.serviceInstance?.icon],
      statusCheckConfiguration: this.formBuilder.group({
        enabled: [this.serviceInstance?.statusCheckConfiguration?.enabled],
        interval: [this.serviceInstance?.statusCheckConfiguration?.interval],
        checkUrl: [this.serviceInstance?.statusCheckConfiguration?.checkUrl],
      }),
    });

    this.form.get('statusCheckConfiguration.enabled')?.valueChanges.subscribe(enabled => {
      const intervalControl = this.form.get('statusCheckConfiguration.interval');
      const checkUrlControl = this.form.get('statusCheckConfiguration.checkUrl');

      if (enabled) {
        intervalControl?.clearValidators();
        intervalControl?.setValidators(Validators.required);
      } else {
        intervalControl?.clearValidators();
        intervalControl?.setValue(null);
        checkUrlControl?.setValue(null);
      }

      intervalControl?.markAsDirty();
      intervalControl?.updateValueAndValidity();
    });
  }

  statusCheckEnabled(): boolean {
    return this.form.get('statusCheckConfiguration.enabled')?.value ?? false;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.serviceInstance = {
      ...this.serviceInstance,
      ...this.form.value,
    };

    if (!this.serviceInstance) {
      return;
    }

    this.isSaving = true;
    this.serviceInstanceService.saveServiceInstance(this.serviceInstance).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Saved',
        detail: 'Service successfully saved',
        life: 2000,
      });

      this.isSaving = false;
      void this.router.navigate(['/']);
    });
  }
}
