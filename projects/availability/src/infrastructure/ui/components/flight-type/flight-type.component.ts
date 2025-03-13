import { Component, Input } from '@angular/core';
import { IFormFlight } from '../../../../domain/model/flight.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lib-flight-type',
  imports: [DatePipe],
  templateUrl: './flight-type.component.html',
  styleUrl: './flight-type.component.scss'
})
export class FlightTypeComponent {
  @Input() public text!: string;
  @Input() public form!: IFormFlight;
}
