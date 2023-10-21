import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SharedService {

  loading$ = new Subject<boolean>();

  apiURL = 'https://reqres.in/api/'

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {}

  showToastr(type:string,message:string){
    switch (type){
      case 'success':
        this.toastr.success(message)
        break;
      case 'error':
        this.toastr.error(message)
        break;
      default:
        this.toastr.info('default message')
    }
  }

  getUsers(page = 1):Observable<any> {
    return this.http.get(`${this.apiURL}users?page=${page}`);
  }

  getUserById(id:number):Observable<any> {
    return this.http.get(`${this.apiURL}users/${id}`);
  }

  updateUser(id: string,firstName:string,lastName:string,email:string) {
    return this.http.put(`${this.apiURL}users/${id}`, {
      first_name: firstName,
      last_name: lastName,
      email : email
    });
  }

  login(userEmail: string, userPassword: string):Observable<any> {
    return this.http.post(`${this.apiURL}login`, {
      email: userEmail,
      password: userPassword,
    });
  }

  createUser(firstName:string,lastName:string,email:string):Observable<any> {
    return this.http.post(`${this.apiURL}users`, {
      name: firstName,
      last_name: lastName,
      email : email
    });
  }

  removeUser(id:string){
    return this.http.delete(`${this.apiURL}users/${id}`);
  }

  logOut() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
