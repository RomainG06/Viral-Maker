import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { Sport } from 'src/app/models/theme';
import { ClubService } from 'src/app/services/club/club.service';
import { SportService } from 'src/app/services/sport/sport.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html'
})
export class CreateClubComponent implements OnInit {

  club: Club = new Club({
    name: '',
    description: '',
    sport_id: 0,
    city: '',
    user_id_owner: '' // tu peux récupérer ça depuis le user connecté
  });

  sports: Sport[] = [];

  constructor(
    private clubService: ClubService,
    private sportService: SportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSports();
    this.loadUserId();
  }

  loadSports(): void {
    this.sportService.getSports().subscribe({
      next: (data) => {
        this.sports = data;
      },
      error: (err) => {
        console.error('Erreur chargement sports', err);
      }
    });
  }

  loadUserId(): void {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const payload = Utils.parseJwt(accessToken);
      if (payload && payload.sub) {
        this.club.user_id_owner = payload.sub;
      } else {
        console.warn('User ID non trouvé dans le token');
      }
    } else {
      console.warn('Access token non trouvé');
    }
  }

  onSubmit(): void {
    if (!this.club.name || !this.club.description || !this.club.sport_id || !this.club.city || !this.club.user_id_owner) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.clubService.createClub(this.club).subscribe({
      next: (createdClub) => {
        alert('Club créé avec succès !');
        // Par exemple, rediriger vers la page du club ou liste
        this.router.navigate(['/clubs', createdClub.slug || createdClub.id]);
      },
      error: (err) => {
        console.error('Erreur création club', err);
        alert('Erreur lors de la création du club.');
      }
    });
  }
}
