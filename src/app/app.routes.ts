import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileSettingsComponent } from './components/auth/profile-settings/profile-settings.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AuthGuard } from './components/utils/services/AuthServices/auth-services.service';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: ProfileSettingsComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
];
