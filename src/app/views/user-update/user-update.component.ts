import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/iuser';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})

export class UserUpdateComponent {

  userID!:string | null;

  userDetails!:User;

  subscription = new Subscription();


  updateUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required,Validators.maxLength(50)]),
  });

  constructor(private sharedService: SharedService , private router: Router , private activatedRoute: ActivatedRoute) {}

  getUserDetails(id:string){
    this.subscription.add(this.sharedService.getUserById(+id).subscribe((e) => {

      this.userDetails = e.data
      this.updateUserForm.controls['firstName'].setValue(e.data.first_name);
      this.updateUserForm.controls['lastName'].setValue(e.data.last_name);
      this.updateUserForm.controls['email'].setValue(e.data.email);

    }));
  }

  updateUser(id:string | null){

    let firstName = this.updateUserForm.value.firstName
    let lastName = this.updateUserForm.value.lastName
    let email = this.updateUserForm.value.email

    this.subscription.add(this.sharedService.updateUser(id!,firstName!,lastName!,email!).subscribe(
      (e) => {
        this.sharedService.showToastr('success',`user ${firstName} updated successful`);
        this.router.navigate(['/default/users']);
      },
      (error) => {
        this.sharedService.showToastr('error', 'update user failed');
      }
    ));



  }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getUserDetails(this.userID);
  }

  onSubmit() {
    this.updateUser(this.userID);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
