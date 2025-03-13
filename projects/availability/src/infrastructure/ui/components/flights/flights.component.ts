import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlightInfoComponent } from '../flight-info/flight-info.component';
import { IFlight, IFlightSelected, IFormFlight } from '../../../../domain/model/flight.model';

@Component({
  selector: 'lib-flights',
  imports: [FlightInfoComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent {
  @Input() public form!: IFormFlight;
  @Input() public flights!: IFlight[];

  @Output() public selectedFlight = new EventEmitter<{
    price: number,
    flightNumber: string,
    origin: {name: string, abbreviation: string, airport: string},
    destination: {name: string, abbreviation: string, airport: string},
  }>();

  onFlightSelected(selectedFlight: {price: number, flightNumber: string}) {
    this.selectedFlight.emit({
      price: selectedFlight.price,
      flightNumber: selectedFlight.flightNumber,
      origin: {...this.form.origin},
      destination: {...this.form.destination},
    });
  }
}
