import { SharedService } from 'src/app/shared/shared.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading = false;

  constructor(private sharedService:SharedService) {}

  ngOnInit() {
    this.sharedService.loading$.subscribe(value=> this.loading = value);
  }
}
