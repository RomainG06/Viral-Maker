import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-explore-clubs',
  templateUrl: './explore-clubs.component.html',
  styleUrls: ['./explore-clubs.component.css']
})
export class ExploreClubsComponent {
  clubs: any[] = [];
  offset = 0;
  limit = 9;

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    this.clubService.exploreClubs(undefined, undefined, this.limit, this.offset).subscribe(
      (res) => {
        this.clubs = this.clubs.concat(res.clubs);
        this.offset += this.limit;
      },
      (err) => {
        console.error('Erreur chargement clubs publics', err);
      }
    );
  }
}
