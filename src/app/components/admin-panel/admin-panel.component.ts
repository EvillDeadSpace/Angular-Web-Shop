import { Component, OnInit } from '@angular/core';
import { ProductService } from '../utils/services/services/product.service'; // Importaj ProductService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../utils/services/global/global-variable.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  providers: [ProductService], // Dodaj servis kao provider
})
export class AdminPanelComponent implements OnInit {
  products: { id: number; product_name: string; price: number }[] = []; // Sadrži proizvode
  product = { product_name: '', image_url: '', price: 0 }; // Model za produkt koji će biti dodan
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private globalServices: GlobalService
  ) {
    console.log(this.globalServices.apiUrl);
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          price: product.price,
        }));
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  addProduct() {
    const productData = {
      product_name: this.product.product_name,
      image_url: this.product.image_url,
      price: this.product.price,
    };

    this.productService.addProduct(productData).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.loadProducts(); // Osvježava listu proizvoda
        // Resetiranje forme nakon uspješnog dodavanja
        this.product = { product_name: '', image_url: '', price: 0 };
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  deleteProduct(productId: number): void {
    console.log('Deleting product with ID:', productId);

    this.http
      .post(
        'http://localhost/api/remuveProducts.php',
        { id: productId },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .subscribe({
        next: (response: any) => {
          console.log('Product deleted successfully', response);
          // Uklonite proizvod iz lokalne liste proizvoda
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
        },
        error: (error) => {
          console.error('Error deleting product', error);
        },
      });
  }
}
