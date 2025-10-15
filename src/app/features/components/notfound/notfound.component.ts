import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-notfound',
  imports: [NavbarComponent],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('/home'); 
  }
}
