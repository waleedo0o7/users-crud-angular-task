import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces/iuser';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersComponent {

  userList!:User[];

  pagination = {
    currentPage : 1,
    totalItems :  0
  }

  subscription = new Subscription();


  constructor(private sharedService: SharedService) {}

  getAllUsers(page = 1 ){
    this.subscription.add(this.sharedService.getUsers(page).subscribe((e) => {
      this.userList = e.data;
      this.pagination.totalItems = e.total
    }));
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
