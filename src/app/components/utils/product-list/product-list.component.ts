import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // Postavljanje dobijenih podataka
        console.log(this.products); // Provera u konzoli
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
}
