import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserRegisterComponent } from '../../forms/user-register/user-register.component';
import { CreateUserUseCase } from '../../../../application/users/create-user.useCase';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../../domain/model/user.model';

@Component({
  selector: 'lib-register-container',
  imports: [UserRegisterComponent ],
  templateUrl: './register-container.component.html',
  styles: ''
})
export class RegisterContainerComponent implements OnInit, OnDestroy{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private createUserUseCase = inject(CreateUserUseCase);


  ngOnInit(): void {
    this.createUserUseCase.initSubscriptions();
  }

  ngOnDestroy(): void {
      this.createUserUseCase.destroySubscriptions();
  }

  handleSubmit(user: IUser){
    this.createUserUseCase.execute(user).subscribe({
      next: () => {
        this.router.navigate(['users/login']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}

