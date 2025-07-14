import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from 'src/app/models/club';
import { ClubService } from 'src/app/services/club/club.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css']
})
export class ClubDetailsComponent implements OnInit {
  club: Club | null = null;
  posts: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.clubService.getClubBySlug(slug).subscribe({
        next: (response) => {
          this.club = response.club;
          this.loadFakePosts(); // temporaire
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur chargement club :', err);
          this.error = 'Club introuvable.';
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'Slug manquant dans l’URL.';
      this.isLoading = false;
    }
  }

  loadFakePosts() {
    // 📝 posts temporaires en dur
    this.posts = [
      { content: '🚴‍♂️ Entraînement collectif dimanche 9h30 au stade !', created_at: new Date() },
      { content: '🏆 Bravo à nos U17 pour leur victoire ce week-end 💪', created_at: new Date() },
      { content: '🗓️ Assemblée générale le 25 juillet à 19h', created_at: new Date() }
    ];
  }

  likePost(post: any) {
    console.log(`Like sur : ${post.content}`);
  }
}