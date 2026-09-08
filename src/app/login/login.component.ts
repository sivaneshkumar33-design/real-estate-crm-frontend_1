import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  setCredentials(role: 'admin' | 'sales'): void {
    if (role === 'admin') {
      this.email = 'admin@gmail.com';
      this.password = 'admin123';
    } else {
      this.email = 'sales@example.com';
      this.password = 'admin123';
    }
  }

  login(): void {

    if (!this.email || !this.password) {

      this.errorMessage =
        'Email and password are required';

      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .login(this.email, this.password)
      .subscribe({

        next: (response) => {

          this.loading = false;

          if (response.success) {

            this.router.navigate(['/dashboard']);

          }

        },

        error: (error) => {

          this.loading = false;

          this.errorMessage =
            error.error?.message ||
            'Login failed';

        }

      });
  }
}