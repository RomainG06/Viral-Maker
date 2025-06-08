import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CreditsService extends BaseApiService {
  getCredits(): Observable<any> {
    return this.get<any>('/credits');
  }

  purchaseCredits(amount: number): Observable<any> {
    return this.post<any>('/credits/purchase-credits', { amount });
  }
}