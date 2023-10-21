import { SharedService } from 'src/app/shared/shared.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  subscription = new Subscription();

  constructor(private sharedService: SharedService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  onSubmit() {
    let userEmail = this.loginForm.value.email!;
    let userPassword = this.loginForm.value.password!;

    this.subscription.add(this.sharedService.login(userEmail,userPassword).subscribe((data) => {
      localStorage.setItem('authToken',data.token);
      this.router.navigate(['/default']);
      this.sharedService.showToastr('success','login successful');
    },(error) => {
      this.sharedService.showToastr('error',error.error.error);
    }));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
