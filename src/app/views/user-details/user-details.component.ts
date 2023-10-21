import { SharedService } from 'src/app/shared/shared.service';
import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/shared/interfaces/iuser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {

  subscription = new Subscription();
  userDetails!:User;

  constructor(private sharedService: SharedService , private activatedRoute: ActivatedRoute) {}

  getUserDetails(id:string){
   this.subscription.add(this.sharedService.getUserById(+id).subscribe((e) => {
      this.userDetails = e.data;
    }));
  }

  ngOnInit() {
    const userID = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getUserDetails(userID);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
