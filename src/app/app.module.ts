import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserCardComponent } from './shared/user-card/user-card';
import { UsersComponent } from './views/users-list/users-list.component';
import { LoginComponent } from './views/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { UserUpdateComponent } from './views/user-update/user-update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './shared/layouts/default-layout/header/header.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';
import { AppInterceptor } from './shared/app-interceptor';
import { UserCreateComponent } from './views/user-create/user-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UsersComponent,
    LoginComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    HeaderComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    AppInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
