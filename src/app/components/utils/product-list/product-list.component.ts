import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from '../services/global/global-variable.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, HttpClientModule],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
  purchaseProduct(productName: string): void {
    const username = this.globalService.username;
    const purchaseDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const purchaseDetails = {
      username: username,
      product_name: productName,
      purchase_date: purchaseDate,
    };

    this.productService.purchaseProduct(purchaseDetails).subscribe({
      next: (response) => {
        console.log('Product purchased successfully:', response);
        this.fetchProducts();
      },
      error: (err) => {
        console.error('Error purchasing product:', err);
      },
    });
  }
}
