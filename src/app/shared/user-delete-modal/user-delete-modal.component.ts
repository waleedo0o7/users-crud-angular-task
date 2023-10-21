import { Component, Input } from '@angular/core';
import { SharedService } from '../shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'delete-user-modal',
	standalone: true,
	templateUrl:'user-delete-modal.component.html'
})

export class deleteUserModal {
	@Input() name!:string;
  @Input() id!:string;
	constructor(public sharedService:SharedService,public activeModal: NgbActiveModal) {}

  removeUser(){
    return this.sharedService.removeUser(this.id).subscribe( (e) =>{
      this.sharedService.showToastr('success','user deleted');
      this.activeModal.close()
    })
  }
}
