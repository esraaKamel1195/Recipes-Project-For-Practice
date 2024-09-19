import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DatastorageService } from '../services/datastorage.service';
import { AuthenticationsService } from '../services/authentications.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenicated: boolean = false;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private dataStoreService: DatastorageService,
    private authenticationService: AuthenticationsService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authenticationService.user.subscribe({
      next: (user) => {
        this.isAuthenicated = !user ? false : true;
      },
    });
  }

  onSaveData() {
    this.dataStoreService.storeRecipe();
  }

  onFetchData() {
    this.dataStoreService.fetchData();
  }

  onLogout() {
    this.isAuthenicated = false;
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
