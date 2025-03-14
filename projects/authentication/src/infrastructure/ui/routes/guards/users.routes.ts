import { Routes } from "@angular/router";
import { UsersContainerComponent } from "../../containers/user-container/user-container.component";
import { SidebarComponent } from "shared";
import { LoginContainerComponent } from "../../containers/login-container/login-container.component";
import { UserRegisterComponent } from "../../forms/user-register/user-register.component";
import { RegisterContainerComponent } from "../../containers/register-container/register-container.component";
import { UserProfileContainerComponent } from "../../containers/user-profile-container/user-profile-container.component";

export const authRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: UsersContainerComponent,
            },
            {
                path: '',
                component: SidebarComponent,
                outlet: 'header'
            },
            {
                path: 'login',
                component: LoginContainerComponent
            },
            {
                path: 'register',
                component: RegisterContainerComponent
            },
            {
                path: 'update/:email',
                component: RegisterContainerComponent
            },
            {
                path: 'profile/:email',
                component: UserProfileContainerComponent
            }

        ],
    },
    
]