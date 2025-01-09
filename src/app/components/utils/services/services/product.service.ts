import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost/api/products.php'; // Vaš PHP endpoint
  private apiSetUrl = 'http://localhost/api/insertProducts.php'; // Vaš PHP endpoint za dodavanje proizvoda
  private apiUrlGetAllPurchases = 'http://localhost/api/selectBuy.php';
  private apiUrlToBuy = 'http://localhost/api/purchases.php';

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
  purchaseProduct(purchaseDetails: {
    username: string | null;
    product_name: string;
    purchase_date: string;
  }): Observable<any> {
    return this.http.post<any>(this.apiUrlToBuy, purchaseDetails);
  }
  // Metoda za dobijanje svih kupovina
  getAllPurchases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlGetAllPurchases);
  }
}
