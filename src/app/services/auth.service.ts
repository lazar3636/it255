import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: User = <User>{};

  constructor() {}

  login(uname: string, pw: string): boolean {
    if (!this.isLoggedIn()) {
      this.currentUser.username = uname;
      this.currentUser.password = pw;
      return true;
    } else {
      return false;
    }
  }

  register(
    fname: string,
    lname: string,
    email: string,
    username: string,
    password: string
  ): boolean {
    if (!this.isLoggedIn()) {
      this.currentUser.fname = fname;
      this.currentUser.lname = lname;
      this.currentUser.email = email;
      this.currentUser.username = username;
      this.currentUser.password = password;

      return true;
    } else {
      return false;
    }
  }

  logout(): any {
    this.currentUser = <User>{};
  }

  getUser(): any {
    return this.currentUser.username;
  }

  setUser(
    fname: string,
    lname: string,
    email: string,
    uname: string,
    pw: string
  ): void {
    this.currentUser.fname = fname;
    this.currentUser.lname = lname;
    this.currentUser.email = email;
    this.currentUser.username = uname;
    this.currentUser.password = pw;
  }

  isLoggedIn(): boolean {
    return this.currentUser.username != undefined;
  }

  getFirstName(): string {
    return this.currentUser.fname;
  }

  getLastName(): string {
    return this.currentUser.lname;
  }

  getEmail(): string {
    return this.currentUser.email;
  }

  getPassword(): string {
    return this.currentUser.password;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService },
];
