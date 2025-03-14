import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../../../domain/model/user.model';
import { ListUsersUseCase } from '../../../../application/users/list-user.useCase';
import { UserDashboardComponent } from '../../components/user-dashboard/user-dashboard.component';
import { CreateUserUseCase } from '../../../../application/users/create-user.useCase';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-users-container',
  imports: [UserDashboardComponent, AsyncPipe],
  templateUrl: './user-container.component.html',
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private readonly _getUseCase = inject(ListUsersUseCase);
  private readonly _createUseCase = inject(CreateUserUseCase);
  public users$: Observable<IUser[]>;

  ngOnInit(): void {
    this._getUseCase.initSubscriptions();
    this._createUseCase.initSubscriptions();
    this._getUseCase.execute();
    this.users$ = this._getUseCase.users$();
  }

  ngOnDestroy(): void {
    this._getUseCase.destroySubscriptions();
    this._createUseCase.destroySubscriptions();
  }

  handleCreateUser(user: IUser) {
    this._createUseCase.execute(user);
  }

  handleUpdateUser(email: string) {
    this.router.navigate(['users/update',email]);
  }

  

}
