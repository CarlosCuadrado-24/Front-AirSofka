import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../../../domain/model/user.model';
import { environment } from 'shared';


@Injectable({
    providedIn: 'root'
})
export class getByEmailUserServices {
    private readonly _http = inject(HttpClient);

    // execute(email: string): Observable<IUser> {
    //     return this._http.post<IUser>(`${environment.apiUrl}/getByEmail`, email);
    // }

    // execute(email: string): Observable<IUser> {
    //     const params = new HttpParams().set('email', email);
    //     return this._http.get<IUser>(`${environment.apiUrl}/getByEmail`, { params });
    // }

    execute(email: string): Observable<IUser> {
        const body = { email };
        return this._http.post<IUser>(`${environment.apiUrl}/getByEmail`, body, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}