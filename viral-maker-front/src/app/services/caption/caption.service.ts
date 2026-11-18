import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CaptionService extends BaseApiService {

  generateCaptions(prompt: string): Observable<any> {
    const body = { prompt };
    return this.post<any>('/generate-captions', body);
  }

  generateCaptionsImage(prompt: string): Observable<any> {
    const body = { prompt };
    return this.post<any>('/generate-captions/image', body);
  }
}
