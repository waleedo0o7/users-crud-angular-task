import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/iuser';
import { deleteUserModal } from '../user-delete-modal/user-delete-modal.component';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.html',
})

export class UserCardComponent {
  @Input() userData!: User;

  constructor(
    private modalService: NgbModal
  ) {}

  openRemoveUserModal() {
    const modalRef = this.modalService.open(deleteUserModal);
    modalRef.componentInstance.name = this.userData.first_name;
    modalRef.componentInstance.id = this.userData.id;
  }
}
