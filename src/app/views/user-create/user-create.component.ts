import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  subscription = new Subscription();

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  });

  constructor(private sharedService: SharedService,private router: Router) {}

  createUser() {
    let firstName = this.userForm.value.firstName!;
    let lastName = this.userForm.value.lastName!;
    let email = this.userForm.value.email!;

    this.subscription.add(this.sharedService.createUser(firstName, lastName, email).subscribe(
      (e) => {
        this.sharedService.showToastr(
          'success',
          `user ${e.name} created successful`
        );

        this.router.navigate(['/default/users'])
      },
      (error) => {
        this.sharedService.showToastr('error', 'create user failed');
      }
    ));
  }

  onSubmit() {
    this.createUser();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
