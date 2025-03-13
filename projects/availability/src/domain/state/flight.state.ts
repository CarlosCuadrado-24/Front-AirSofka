import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StateFactory } from "shared";
import { IFlight, IFlightSelected, IFormFlight } from "../model/flight.model";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FlightState {
  private readonly _factory = inject(StateFactory); 

  //#region Subjects
  private readonly flightsOrigin$ = new BehaviorSubject<IFlight[]>([]);
  private readonly flightsDestination$ = new BehaviorSubject<IFlight[]>([]);
  private readonly flightOriginSelected$ = new BehaviorSubject<IFlightSelected>(null);
  private readonly flightDestinationSelected$ = new BehaviorSubject<IFlightSelected>(null);
  private readonly form$ = new BehaviorSubject<IFormFlight>(null)
  //#endregion

  store() {
    return {
      flightsOrigin: this._factory.state(this.flightsOrigin$),
      flightsDestination: this._factory.state(this.flightsDestination$),
      flightOriginSelected: this._factory.state(this.flightOriginSelected$),
      flightDestinationSelected: this._factory.state(this.flightDestinationSelected$),
      form: this._factory.state(this.form$)
    }
  }
}