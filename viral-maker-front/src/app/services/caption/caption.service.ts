import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CaptionService extends BaseApiService {

  generateCaptions(theme: string): Observable<any> {
    const body = { theme };
    return this.post<any>('/generate-captions', body);
  }
}
