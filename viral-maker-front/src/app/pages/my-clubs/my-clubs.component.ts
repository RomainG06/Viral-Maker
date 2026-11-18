import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club/club.service';
import { SupabaseService } from 'src/app/services/supabase-auth/supabase.service';

@Component({
  selector: 'app-my-clubs',
  templateUrl: './my-clubs.component.html',
  styleUrls: ['./my-clubs.component.css']
})
export class MyClubsComponent {
  clubs: Club[] = [];

  constructor(private clubService: ClubService, private supabaseService: SupabaseService) { }

  async ngOnInit(): Promise<void> {
    const userId = await this.supabaseService.getUserId();

    if (userId) {
      this.clubService.getUserClubs(userId).subscribe({
        next: (res) => {
          this.clubs = res.clubs;
        },
        error: (err) => {
          console.error("Erreur chargement clubs :", err);
        }
      });
    } else {
      console.error("User ID is null.");
    }
  }
}
