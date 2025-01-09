import { Component } from '@angular/core';
import { ProductListComponent } from '../utils/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from '../utils/services/global/global-variable.service';
@Component({
  selector: 'app-home',
  imports: [ProductListComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  username: string | null = null;

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.username = this.globalService.username;
  }
}
