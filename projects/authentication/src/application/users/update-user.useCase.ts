import { inject, Injectable } from "@angular/core";
import { State } from "../../domain/state";
import { IUser } from "../../domain/model/user.model";
import { Observable, Subscription, tap } from "rxjs";
import { UpdateUserService } from "../../infrastructure/services/users/update-user.service";

@Injectable({
    providedIn: 'root'
})
export class UpdateUserUseCase {
    private readonly _service = inject(UpdateUserService);
    private readonly _state = inject(State);
    private subscriptions: Subscription;

    initSubscriptions(): void {
        this.subscriptions = new Subscription();
    }

    destroySubscriptions(): void {
        this.subscriptions.unsubscribe();
    }

    execute(token: string, user: IUser): Observable<IUser> {
        return this._service.execute(token, user).pipe(
            tap(updatedUser => {
                const currentUsers = this._state.users.users.snapshot();

                const updatedUsers = currentUsers.map(u =>
                    u.email === updatedUser.email ? updatedUser : u
                );

                this._state.users.users.set(updatedUsers);
            })
        );
    }
}
