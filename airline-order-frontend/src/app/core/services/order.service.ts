import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../shared/models/order.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<{data: Order[]}>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<{data: Order}>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
  pay(id: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${id}/pay`, {});
  }

  cancel(id: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${id}/cancel`, {});
  }

  retryTicketing(id: string): Observable<void> {
    // 这个请求会立即返回 202, 后端在后台处理
    return this.http.post<void>(`${this.apiUrl}/${id}/retry-ticketing`, {});
  }
}
