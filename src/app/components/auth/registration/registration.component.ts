import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
})
export class RegistrationComponent {
  userRegistration = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  async onRegister() {
    if (!this.emailRegex.test(this.userRegistration.email)) {
      alert('Invalid email format');
      return;
    }
    if (
      this.userRegistration.password !== this.userRegistration.confirmPassword
    ) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      username: this.userRegistration.username,
      email: this.userRegistration.email,
      password: this.userRegistration.password,
    };

    this.http.post('http://localhost/api/registration.php', formData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
