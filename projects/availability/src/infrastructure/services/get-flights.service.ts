import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFlight, IRequiredFlight } from '../../domain/model/flight.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GetFlightsService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/search-flight';

  execute(requiredFlight: IRequiredFlight): Observable<IFlight[]> {
    return this.http.post<IFlight[]>(this.apiUrl, requiredFlight, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders()
      .append('Content-Type', 'application/json')
  }
}