import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected baseUrl = 'http://127.0.0.1:8000';

  constructor(protected http: HttpClient) { }

  protected get<T>(url: string) {
    return this.http.get<T>(`${this.baseUrl}${url}`, {
      //   headers: this.getHeaders()
    });
  }

  protected post<T>(url: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, {
      headers: this.getHeaders()
    });
  }

  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }
}
