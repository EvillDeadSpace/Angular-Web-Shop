import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  imports: [CommonModule],
})
export class DropdownMenuComponent {
  constructor(private r: Router) {}
  isVisible = false;

  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

  goToProfile() {
    console.log('Navigating to Profile Settings');
    this.r.navigate(['/settings']);
  }

  logout() {
    this.r.navigate(['/login']);
    console.log('Logging out');
  }
}
