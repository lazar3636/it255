import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    if (window.confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.router.navigate(['login']);
    } else {
      console.log('logout declined');
    }
  }
}
