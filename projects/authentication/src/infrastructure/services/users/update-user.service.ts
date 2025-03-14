import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../domain/model/user.model';
import { environment } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  private readonly _http = inject(HttpClient);

    execute(token: string, user: IUser): Observable<IUser> {
        const url = `${environment.apiUrl}/modify-user`;

        const body = {
            token: token,
            name: user.name,
            password: user.password,
            phoneNumber: user.phoneNumber,
            nacionality: user.nacionality
        };

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this._http.put<IUser>(url, body, { headers });
    }
}
