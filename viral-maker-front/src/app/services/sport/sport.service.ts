import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class SportService extends BaseApiService {

  getSports(): Observable<any> {
    return this.get('/sports/');
  }
}
