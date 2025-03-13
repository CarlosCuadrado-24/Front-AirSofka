import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTypeComponent } from './flight-type.component';

describe('FlightTypeComponent', () => {
  let component: FlightTypeComponent;
  let fixture: ComponentFixture<FlightTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
