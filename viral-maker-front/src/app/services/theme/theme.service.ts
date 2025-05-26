import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends BaseApiService {

  getThemes(): Observable<any> {
    return this.get('/themes/');
  }
}
