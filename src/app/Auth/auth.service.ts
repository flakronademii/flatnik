import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private users: AuthData[]=[];
  private usersUpdated = new Subject<{ users: AuthData[]; userCount: number }>();

  private isAuthenticated = false;
  private userRole : string|any;
  private token: string|any;
  private tokenTimer: any;
  private userId: string|any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    console.log(this.token);

    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserRole(){

    return this.userRole;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getUsers(usersPerPage: number, currentPage: number) {
    return this.http.get(`${BACKEND_URL}users`)
  }

  createUser(email: string, password: string,userRole:string) {
    const authData: AuthData = { email: email, password: password ,userRole:userRole};
    this.http.post(BACKEND_URL + "signup", authData).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      error => {
        this.authStatusListener.next(false);
      }
    );
  }
  getPostUpdateListener() {
    return this.usersUpdated.asObservable();
  }
  login(email: string, password: string , userRole:string) {
    const authData: AuthData = { email: email, password: password ,userRole:userRole };
    this.http
      .post<{ token: string; expiresIn: number; userId: string , userRole:string }>(
        BACKEND_URL + "/login",
        authData
      )
      .subscribe(
        response => {
          console.log(response);

          const token = response.token;
          this.token = token;
          const userRole = response.userRole;
           this.userRole = userRole;

          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.userRole = response.userRole;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId , this.userRole);
            this.router.navigate(["/"]);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.userRole = authInformation.userRole;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null  ;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string,userRole:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", this.userRole);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const userRole = localStorage.getItem("userRole");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      userRole:userRole
    };
  }
   deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + "users/" + userId);
  }
}
