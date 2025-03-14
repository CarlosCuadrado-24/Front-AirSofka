import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { IUser } from '../../../../domain/model/user.model';

@Component({
  selector: 'lib-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
public onUpdateUser = output<string>();

@Output() onSubmit = new EventEmitter<IUser>();
@Input() user: IUser | null = null; 

updateUser(email: string) {
  this.onUpdateUser.emit(email);
}

}
