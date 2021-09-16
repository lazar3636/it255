import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userProfile: FormGroup;
  profileUpdated = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  // preuzimanje podataka u novoj formi
  initForm() {
    this.userProfile = new FormGroup({
      fname: new FormControl(this.authService.getFirstName(), [
        Validators.required,
      ]),
      lname: new FormControl(this.authService.getLastName(), [
        Validators.required,
      ]),
      email: new FormControl(this.authService.getEmail(), [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl(this.authService.getUser(), [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(this.authService.getPassword(), [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm: new FormControl(this.authService.getPassword(), [
        Validators.required,
      ]),
    });
  }

  saveUser() {
    this.authService.setUser(
      this.userProfile.get('fname').value,
      this.userProfile.get('lname').value,
      this.userProfile.get('email').value,
      this.userProfile.get('username').value,
      this.userProfile.get('password').value
    );
    setTimeout(() => {
      this.profileUpdated = !this.profileUpdated;
    }, 800);
  }

  // testing password
  pwdoesntmatch() {
    if (this.userProfile.get('password')) {
      let pw = this.userProfile.get('password')?.value;
      if (this.userProfile.get('confirm')) {
        let con = this.userProfile.get('confirm')?.value;
        if (pw !== con) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get f() {
    return this.userProfile.controls;
  }

  get isDisabled() {
    return this.userProfile.invalid && this.userProfile.touched;
  }
}
