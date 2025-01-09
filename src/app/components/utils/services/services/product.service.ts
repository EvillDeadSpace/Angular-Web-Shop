import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost/api/products.php'; // Vaš PHP endpoint
  private apiSetUrl = 'http://localhost/api/insertProducts.php'; // Vaš PHP endpoint za dodavanje proizvoda

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Metoda za dodavanje proizvoda
  addProduct(product: {
    product_name: string;
    image_url: string;
    price: number;
  }): Observable<any> {
    return this.http.post<any>(this.apiSetUrl, product);
  }
}
