import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirm: new FormControl('', [Validators.required]),
    });
  }

  register() {
    let fname = this.registerForm.get('fname')?.value;
    let lname = this.registerForm.get('lname')?.value;
    let email = this.registerForm.get('email')?.value;
    let username = this.registerForm.get('username')?.value;
    let password = this.registerForm.get('password')?.value;

    if (this.authService.register(fname, lname, email, username, password)) {
      this.router.navigate(['/home']);
    }
  }

  pwdoesntmatch() {
    if (this.registerForm.get('password')) {
      let pw = this.registerForm.get('password')?.value;
      if (this.registerForm.get('confirm')) {
        let con = this.registerForm.get('confirm')?.value;
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
    return this.registerForm.controls;
  }

  get isDisabled() {
    return this.registerForm.invalid && this.registerForm.touched;
  }
}
