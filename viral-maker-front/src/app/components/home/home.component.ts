import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Theme } from 'src/app/models/theme';
import { CaptionService } from 'src/app/services/caption/caption.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private themeService: ThemeService, private captionService: CaptionService, private router: Router) { }
  themes: Theme[] = [];
  captions: string[] = [];

  ngOnInit() {
    this.getThemes();
  }

  buyCredits() {
    alert('Fonction d’achat de crédits à venir 💳🔥');
  }

  getThemes() {
    this.themeService.getThemes().subscribe({
      next: (data) => {
        this.themes = data;
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


  goToTheme(name: string) {
    this.router.navigate(['/theme', name]);
  }
}
