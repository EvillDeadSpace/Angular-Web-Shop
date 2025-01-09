import { Component, ViewChild } from '@angular/core';
import { DropdownMenuComponent } from '../../utils/dropdown-menu/dropdown-menu.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navigation',

  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  imports: [DropdownMenuComponent, RouterLink],
})
export class NavigationComponent {
  @ViewChild(DropdownMenuComponent) dropdownMenu!: DropdownMenuComponent;

  toggleMenu() {
    if (this.dropdownMenu) {
      this.dropdownMenu.toggleMenu();
    } else {
      console.error('DropdownMenuComponent is not available');
    }
  }
}
