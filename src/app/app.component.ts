import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    NavigationComponent,
    RegistrationComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}
  shouldShowLayout(): boolean {
    const excludedRoutes = ['/', '/registration', '/login'];
    return !excludedRoutes.includes(this.router.url);
  }

  title = 'webshop';
}
