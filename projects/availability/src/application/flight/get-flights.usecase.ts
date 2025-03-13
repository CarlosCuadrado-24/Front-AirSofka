import { inject, Injectable } from "@angular/core";
import { GetFlightsService } from "../../infrastructure/services/get-flights.service";
import { State } from "../../domain/state";
import { Observable, Subscription, tap } from "rxjs";
import { IFlight, IFlightSelected, IRequiredFlight } from "../../domain/model/flight.model";


@Injectable({
  providedIn: 'root'
})
export class GetFlightsUsecase {
  private readonly _service = inject(GetFlightsService);
  private readonly _state = inject(State);
  private subscriptions: Subscription;

  //#region Observables
  flightsOrigin$(): Observable<IFlight[]> {
    return this._state.flights.flightsOrigin.$() as Observable<IFlight[]>;
  }

  flightsDestination$(): Observable<IFlight[]> {
    return this._state.flights.flightsDestination.$() as Observable<IFlight[]>;
  }

  flightOriginSelected$(): Observable<IFlightSelected> {
    return this._state.flights.flightOriginSelected.$() as Observable<IFlightSelected>;
  }

  flightDestinationSelected$(): Observable<IFlightSelected> {
    return this._state.flights.flightDestinationSelected.$() as Observable<IFlightSelected>;
  }
  //#endregion

  //#region Public Methods
  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  executeFirst(requiredFlight: IRequiredFlight): void {
    this.subscriptions.add(
      this._service.execute(requiredFlight)
        .pipe(
          tap(result => this._state.flights.flightsOrigin.set(result)),
        )
        .subscribe()
    );
  }

  executeSecond(requiredFlight: IRequiredFlight): void {
    this.subscriptions.add(
      this._service.execute(requiredFlight)
        .pipe(
          tap(result => this._state.flights.flightsDestination.set(result)),
        )
        .subscribe()
    );
  }

  saveFlightOriginSelected(flight: IFlightSelected): void {
    this._state.flights.flightOriginSelected.set(flight);
  }

  saveFlightDestinationSelected(flight: IFlightSelected): void {
    this._state.flights.flightDestinationSelected.set(flight);
  }

  viewFlightsOrigin(): void {
    this.subscriptions.add(
      this.flightsOrigin$().subscribe(flights => {
        console.log("vuelos de origen:", flights);
      })
    );
  }

  viewFlightsDestination(): void {
    this.subscriptions.add(
      this.flightsDestination$().subscribe(flights => {
        console.log("vuelos de destino:", flights);
      })
    );
  }

  viewFlightOriginSelected(): void {
    this.subscriptions.add(
      this.flightOriginSelected$().subscribe(flight => {
        console.log("vuelo de origen seleccionado:", flight);
      })
    );
  }

  viewFlightDestinationSelected(): void {
    this.subscriptions.add(
      this.flightDestinationSelected$().subscribe(flight => {
        console.log("vuelo de destino seleccionado:", flight);
      })
    );
  }
  //#endregion
}