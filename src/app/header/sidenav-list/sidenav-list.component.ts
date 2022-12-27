import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from "rxjs";
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit ,OnDestroy{
  @Output() closeSidenav = new EventEmitter<void>();
  userIsAuthenticated = false;
  private authListenerSubs: Subscription = new Subscription;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
