import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../../domain/model/user.model';
import { GetByEmailUserUseCase } from '../../../../application/users/get-by-email-user.UseCase';
import { Observable, of } from "rxjs";
import { AsyncPipe, NgIf } from '@angular/common';
import { UserRegisterComponent } from '../../forms/user-register/user-register.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { UpdateUserUseCase } from '../../../../application/users/update-user.useCase';

@Component({
  selector: 'lib-user-profile-container',
  imports: [UserRegisterComponent,AsyncPipe, NgIf, UserProfileComponent],
  templateUrl: './user-profile-container.component.html',
  styleUrl: './user-profile-container.component.scss'
})
export class UserProfileContainerComponent implements OnInit, OnDestroy{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getByEmailUserUseCase = inject(GetByEmailUserUseCase);
  private updateUserUseCase = inject(UpdateUserUseCase);
  public emailUser?: string;
  public token?: string;
  public user: IUser;
  user$!: Observable<IUser>;
  public action: string;
  public actionButton: string;

  ngOnInit(): void {
    this.getByEmailUserUseCase.initSubscriptions();
    this.updateUserUseCase.initSubscriptions();

    this.route.paramMap.subscribe(params => {
      const emailUserParam = params.get('email');
      if (emailUserParam) {
        this.emailUser = emailUserParam;
        this.action = 'update';
        this.loadUserData(this.emailUser);
        this.token = this.getCookie('AUTH_TOKEN');
        this.actionButton = "Actualizar datos";
      } else {
        this.user$ = of({} as IUser);
        this.action = '';
        this.actionButton = "Crear Cuenta";
      }
    });
  }

  private loadUserData(email: string): void {
    this.getByEmailUserUseCase.execute(email);
    this.user$ = this.getByEmailUserUseCase.user$();
  }

  ngOnDestroy(): void {
    this.updateUserUseCase.destroySubscriptions();
    this.getByEmailUserUseCase.destroySubscriptions();
  }

  handleUpdateUser(email: string) {
    this.router.navigate(['users/update',email]);
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

  handleSubmit(user: IUser) {
    if (this.action === 'update' && this.token!=null ) {
      this.updateUserUseCase.execute(this.token, user).subscribe({
        next: (user) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
            console.error('Error al actualizar usuario:', err);
        }
    });
      console.log("se metio para actualizar");
      
      // console.log (user);
    } 
    console.log("token: ");
  }

}
