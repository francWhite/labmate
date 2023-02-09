import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-dummy-fetcher',
  templateUrl: './dummy-fetcher.component.html',
  styleUrls: ['./dummy-fetcher.component.scss']
})
export class DummyFetcherComponent {
  testProp?: number;


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient
      .get<number>('http://localhost:8000/api')
      .subscribe(result => this.testProp = result)
  }
}
