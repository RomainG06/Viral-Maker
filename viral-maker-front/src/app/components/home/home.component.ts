import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from 'src/app/models/theme';
import { CaptionService } from 'src/app/services/caption/caption.service';
import { SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private sportService: SportService, private captionService: CaptionService, private router: Router) { }
  sports: Sport[] = [];
  captions: string[] = [];

  ngOnInit() {
    this.getThemes();
  }

  buyCredits() {
    alert('Fonction d’achat de crédits à venir 💳🔥');
  }

  getThemes() {
    this.sportService.getSports().subscribe({
      next: (data) => {
        console.log('Thèmes récupérés:', data);
        this.sports = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des thèmes:', error);
      }
    });
  }

  testGenerateCaption(name: string) {
    this.captionService.generateCaptions(name).subscribe({
      next: (response) => {
        console.log('Captions générées avec succès:', response);
        this.captions = response.captions.split('\n');
        console.log(this.captions);
      },
      error: (err) => {
        console.error('Erreur lors de la génération des captions', err);
      }
    });
  }

  goToSport(name: string) {
    this.router.navigate(['/sport', name]);
  }

  goToCreateClub() {
    this.router.navigate(['/create-club']);
  }

}
