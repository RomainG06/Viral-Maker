import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private themeService: ThemeService) { }
  themes = [
    'Motivation 🔥',
    'Humour 🤪',
    'Tech 🚀',
    'Business 💸',
    'Lifestyle 🌴',
    'Inspiration ✨'
  ];

  buyCredits() {
    alert('Fonction d’achat de crédits à venir 💳🔥');
  }

  getThemes() {
    this.themeService.getThemes().subscribe({
      next: (data) => {
        this.themes = data;
        console.log('Thèmes récupérés avec succès:', this.themes);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des thèmes:', error);
      }
    });
  }
}
