import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openGameDetails(id: string): void {
    this.router.navigate(['game-details', id]);
  }

  // scrolling to second section
  scrollS() {
    const yOffsetForNav = -50;
    const element = document.getElementById('sec');
    const y =
      element!.getBoundingClientRect().top + window.pageYOffset + yOffsetForNav;

    window.scrollTo({ top: y });
  }
}
