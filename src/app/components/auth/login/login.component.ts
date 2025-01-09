import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../utils/services/global/global-variable.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
  ],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private globalService: GlobalService
  ) {}

  email: string = '';
  password: string = '';

  userLogin = {
    email: this.email,
    password: this.password,
  };

  onSubmit(): void {
    this.http
      .post('http://localhost/api/login.php', this.userLogin, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (Response: any) => {
          if (Response.status === 'success') {
            console.log('Login successful', Response);
            this.globalService.username = Response.user.username;
            console.log('Global username:', this.globalService.username);
            this.router.navigate(['/home']);
          } else {
            console.error('Login failed', Response);
          }
        },
        error: (error) => {
          console.error('An error occurred', error);
        },
      });
  }
}
