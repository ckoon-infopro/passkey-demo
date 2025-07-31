import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private router: Router) {}

  signup() {
    console.log('Sign Up button clicked');
    // Implement passkey registration logic here
  }

  login() {
    console.log('Login button clicked');
    // Implement passkey authentication logic here
    this.router.navigate(['/home']); // Navigate to home after successful login (for now)
  }
}
