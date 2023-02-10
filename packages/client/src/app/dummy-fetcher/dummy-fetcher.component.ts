import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dummy-fetcher',
  templateUrl: './dummy-fetcher.component.html',
  styleUrls: ['./dummy-fetcher.component.scss']
})
export class DummyFetcherComponent implements OnInit{
  testProp?: number;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    const request_url = `http://${environment.api_hostname}:${environment.api_port}/api`;

    this.httpClient
      .get<number>(request_url)
      .subscribe(result => this.testProp = result);
  }
}
