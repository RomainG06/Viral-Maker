import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sport } from 'src/app/models/theme';
import { CaptionService } from 'src/app/services/caption/caption.service';
import { SportService } from 'src/app/services/sport/sport.service';
import { ClubService } from 'src/app/services/club/club.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Club } from 'src/app/models/club';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    private sportService: SportService,
    private captionService: CaptionService,
    private clubService: ClubService,
    private authService: AuthService,
    private router: Router
  ) { }

  sports: Sport[] = [];
  captions: string[] = [];
  userClubs: Club[] = [];
  hasClubs = false;
  isLoadingClubs = true;

  // Stats pour le dashboard
  stats = {
    totalClubs: 0,
    totalPosts: 0,
    aiGenerations: 0,
    followers: 0
  };

  // Événements à venir (mock data pour l'instant)
  upcomingEvents = [
    { title: 'Match de championnat', date: new Date(2025, 10, 12), club: 'Mon Club' },
    { title: 'Entraînement spécial', date: new Date(2025, 10, 15), club: 'Mon Club' }
  ];

  ngOnInit() {
    this.initDashboard();
  }

  async initDashboard() {
    await this.authService.initUser();
    this.loadUserClubs();
  }

  loadUserClubs() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.clubService.getUserClubs(userId).subscribe({
        next: (response) => {
          this.userClubs = response.clubs || [];
          this.hasClubs = this.userClubs.length > 0;
          this.isLoadingClubs = false;

          this.stats.totalClubs = this.userClubs.length;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des clubs:', error);
          this.isLoadingClubs = false;
          this.hasClubs = false;
        }
      });
    } else {
      this.isLoadingClubs = false;
      this.hasClubs = false;
    }
  }

  buyCredits() {
    alert('Fonction d\'achat de crédits à venir');
  }

  generateCaption() {
    const prompt = 'Contenu sportif viral';
    this.captionService.generateCaptions(prompt).subscribe({
      next: (response) => {
        console.log('Captions générées avec succès:', response);
        this.captions = response.captions.split('\n');
        this.stats.aiGenerations++;
      },
      error: (err) => {
        console.error('Erreur lors de la génération des captions', err);
      }
    });
  }

  goToMyClubs() {
    this.router.navigate(['/my-clubs']);
  }

  goToClub(slug: string | undefined) {
    if (slug) {
      this.router.navigate(['/club', slug]);
    }
  }

  goToCreateClub() {
    this.router.navigate(['/create-club']);
  }

  goToExploreClubs() {
    this.router.navigate(['/explore-clubs']);
  }

}
