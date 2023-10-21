import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './views/users-list/users-list.component';
import { LoginComponent } from './views/auth/login/login.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { UserUpdateComponent } from './views/user-update/user-update.component';

// layouts
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';
import { UserCreateComponent } from './views/user-create/user-create.component';


const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },

  {
    path: 'default',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'user-create', component: UserCreateComponent },
      { path: 'user-details/:id', component: UserDetailsComponent },
      { path: 'user-update/:id', component: UserUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
