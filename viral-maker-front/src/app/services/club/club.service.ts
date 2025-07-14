import { Injectable } from "@angular/core";
import { BaseApiService } from "../base-api/base-api.service";
import { Observable } from "rxjs";
import { Club } from "src/app/models/club";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClubService extends BaseApiService {

  getClubs(): Observable<Club[]> {
    return this.get<Club[]>('/clubs');
  }

  createClub(club: Club): Observable<Club> {
    return this.post<Club>('/clubs', club);
  }

  getUserClubs(userId: string, limit: number = 10, offset: number = 0): Observable<any> {
    return this.get<any>(`/clubs/user/${userId}?limit=${limit}&offset=${offset}`);
  }

  exploreClubs(sportId?: number, city?: string, limit: number = 20, offset: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    if (sportId) {
      params = params.set('sport_id', sportId);
    }
    if (city) {
      params = params.set('city', city);
    }

    return this.http.get(`${this.baseUrl}/clubs/explore`, { params });
  }

  getClubBySlug(slug: string): Observable<any> {
    return this.get<any>(`/clubs/slug/${slug}`);
  }

}
