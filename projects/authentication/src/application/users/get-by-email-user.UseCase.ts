import { inject, Injectable } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { IUser } from "../../domain/model/user.model";
import { State } from "../../domain/state";
import { getByEmailUserServices } from '../../infrastructure/services/users/get-by-email-user.services';

@Injectable({
  providedIn: 'root'
})
export class GetByEmailUserUseCase {

  private readonly _service = inject(getByEmailUserServices);
  private readonly _state   = inject(State);
  private subscriptions: Subscription;

  user$(): Observable<IUser> {
    return this._state.users.currentUser.$();
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(email: string): void {
    this.subscriptions.add(
      this._service.execute(email)  
        .pipe(
          tap((user: IUser) => {
            console.log('Usuario encontrado:', user);
            this._state.users.currentUser.set(user);
          })
        )
        .subscribe()
    );
  }
}
