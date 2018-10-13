import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  constructor(
    private router: Router) {}

  onSubmit() {
    this.router.navigate(['ssdb']);
  }
}
