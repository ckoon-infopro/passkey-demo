import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebAuthnService } from '../webauthn.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';

  constructor(private router: Router, private webAuthnService: WebAuthnService) {}

  async signup() {
    if (!this.username) {
      alert('Please enter a username.');
      return;
    }
    try {
      await this.webAuthnService.registerPasskey(this.username);
    } catch (error) {
      console.error('Registration failed', error);
    }
  }

  async login() {
    try {
      const verificationResult = await this.webAuthnService.authenticatePasskey();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }
}
