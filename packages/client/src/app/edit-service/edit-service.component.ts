import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceInstance } from '../domain/service-instance';
import { ServiceInstanceService } from '../domain/service-instance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private serviceInstanceService: ServiceInstanceService,
    private formBuilder: FormBuilder
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
      imageUrl: [
        this.serviceInstance?.icon,
        Validators.required,
      ],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
