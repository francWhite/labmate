import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyFetcherComponent } from './dummy-fetcher.component';

describe('DummyFetcherComponent', () => {
  let component: DummyFetcherComponent;
  let fixture: ComponentFixture<DummyFetcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyFetcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DummyFetcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
