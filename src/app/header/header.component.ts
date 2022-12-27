import { Component, OnInit, OnDestroy ,EventEmitter, Output} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})



export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  userIsAuthenticated = false;
  showComponent=false;
  userRole:string | undefined;
  private authListenerSubs: Subscription = new Subscription;

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
