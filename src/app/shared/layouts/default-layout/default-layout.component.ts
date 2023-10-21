import { SharedService } from 'src/app/shared/shared.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/']);
    }
  }
}
