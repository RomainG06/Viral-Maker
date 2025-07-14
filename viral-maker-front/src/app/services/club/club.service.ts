import { Injectable } from "@angular/core";
import { BaseApiService } from "../base-api/base-api.service";
import { Observable } from "rxjs";
import { Club } from "src/app/models/club";

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
}
