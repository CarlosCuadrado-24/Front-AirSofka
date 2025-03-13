import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FlightTypeComponent } from '../../components/flight-type/flight-type.component';
import { FlightsComponent } from '../../components/flights/flights.component';
import { FormUseCase } from '../../../../application/form.usecase';
import { Observable } from 'rxjs';
import {
  IFlight,
  IFlightSelected,
  IFormFlight,
} from '../../../../domain/model/flight.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { GetFlightsUsecase } from '../../../../application/flight/get-flights.usecase';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-flight-selection',
  imports: [FlightTypeComponent, FlightsComponent, AsyncPipe, NgIf],
  templateUrl: './flight-selection.component.html',
})
export class FlightSelectionComponent implements OnInit, OnDestroy {
  private readonly _formUsecase = inject(FormUseCase);
  private readonly _getFlightsUsecase = inject(GetFlightsUsecase);
  private readonly router = inject(Router);

  public form$: Observable<IFormFlight>;
  public flightsOrigin$: Observable<IFlight[]>;
  public flightsDestination$: Observable<IFlight[]>;
  public flights$: Observable<IFlight[]>;

  ngOnInit() {
    this._formUsecase.initSubscriptions();
    this._getFlightsUsecase.initSubscriptions();

    this._getFlightsUsecase.executeFirst({
      passengers: {
        adults: this._formUsecase.spanshot()?.passengers?.adults,
        children: this._formUsecase.spanshot()?.passengers?.children,
        infants: this._formUsecase.spanshot()?.passengers?.infants,
      },
      origin: this._formUsecase.spanshot()?.origin?.name,
      destination: this._formUsecase.spanshot()?.destination?.name,
      date: this._formUsecase.spanshot()?.dates?.departure,
    });

    this._getFlightsUsecase.executeSecond({
      passengers: {
        adults: this._formUsecase.spanshot()?.passengers?.adults,
        children: this._formUsecase.spanshot()?.passengers?.children,
        infants: this._formUsecase.spanshot()?.passengers?.infants,
      },
      origin: this._formUsecase.spanshot()?.destination?.name,
      destination: this._formUsecase.spanshot()?.origin?.name,
      date: this._formUsecase.spanshot()?.dates?.return,
    });

    this.flights$ = this._getFlightsUsecase.flightsOrigin$();

    this._formUsecase.viewForm();
    this.form$ = this._formUsecase.form$();
    this.flightsOrigin$ = this._getFlightsUsecase.flightsOrigin$();
    this.flightsDestination$ = this._getFlightsUsecase.flightsDestination$();

    this._getFlightsUsecase.viewFlightsOrigin();
    this._getFlightsUsecase.viewFlightsDestination();
  }

  ngOnDestroy() {
    this._formUsecase.destroySubscriptions();
    this._getFlightsUsecase.destroySubscriptions();
  }

  public showFlights = true;
  public flightPhase: 'ida' | 'regreso' = 'ida';
  flightOriginSelected: IFlightSelected;
  flightReturnSelected: IFlightSelected;

  onFlightSelected(selectedFlight: {
    price: number;
    flightNumber: string;
    origin: { name: string; abbreviation: string; airport: string };
    destination: { name: string; abbreviation: string; airport: string };
  }) {
    this.flights$.subscribe((flights) => {
      const flight = flights.find(
        (f) => f.flightNumber === selectedFlight.flightNumber
      );
      if (!flight) return;

      const taxMapping = {
        [flight.totalPricesInfo.standardPriceTotal]: flight.tax.standardTax,
        [flight.totalPricesInfo.economicPriceTotal]: flight.tax.economicTax,
        [flight.totalPricesInfo.favorablePriceTotal]: flight.tax.favorableTax,
        [flight.totalPricesInfo.executiveTotalPrice]: flight.tax.executiveTax,
        [flight.totalPricesInfo.executiveFullTotalPrice]:
          flight.tax.executiveFullTax,
      };

      const flightSelected: IFlightSelected = {
        flightId: flight.flightId,
        flightNumber: flight.flightNumber,
        aircraftModel: flight.aircraftModel,
        duration: flight.duration,
        operatingAirline: flight.operatingAirline,
        origin: selectedFlight.origin,
        destination: selectedFlight.destination,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        tax: taxMapping[selectedFlight.price] ?? 0,
        prices: selectedFlight.price - taxMapping[selectedFlight.price],
        totalPricesInfo: selectedFlight.price,
      };

      if (this.flightPhase === 'ida') {
        this.flightOriginSelected = flightSelected;
        this._getFlightsUsecase.saveFlightOriginSelected(
          this.flightOriginSelected
        );
        this._getFlightsUsecase.viewFlightOriginSelected();
        this.flightPhase = 'regreso';
        this.flights$ = this._getFlightsUsecase.flightsDestination$();
      } else {
        this.flightReturnSelected = flightSelected;
        this._getFlightsUsecase.saveFlightDestinationSelected(
          this.flightReturnSelected
        );
        this._getFlightsUsecase.viewFlightDestinationSelected();

        this.router.navigate(['/']);
      }

      this.reloadFlights();
    });
  }

  private reloadFlights() {
    this.showFlights = false;
    setTimeout(() => {
      this.showFlights = true;
    }, 100);
  }
}