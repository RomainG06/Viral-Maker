import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  sportName: string | null = null;
  isFollowing = false;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.clubService.getClubBySlug(slug).subscribe({
        next: (response) => {
          this.club = response.club;
          this.loadFakePosts(); // temporaire
          this.isLoading = false;
          this.checkIfFollowing();

          if (this.club?.sport_id) {
            this.clubService.getSportNameById(this.club.sport_id).subscribe({
              next: (res) => {
                this.sportName = res.name;
                console.log('Sport Name:', this.sportName);
              },
              error: (err) => {
                console.error('Erreur récupération sport :', err);
              }
            });
          }
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
    this.posts = [
      { content: '🚴‍♂️ Entraînement collectif dimanche 9h30 au stade !', created_at: new Date() },
      { content: '🏆 Bravo à nos U17 pour leur victoire ce week-end 💪', created_at: new Date() },
      { content: '🗓️ Assemblée générale le 25 juillet à 19h', created_at: new Date() }
    ];
  }

  likePost(post: any) {
    console.log(`Like sur : ${post.content}`);
  }

  confirmDeleteClub() {
    if (!this.club?.id) {
      console.error("Club ID introuvable");
      return;
    }

    if (confirm("Voulez-vous vraiment supprimer ce club ?")) {
      this.clubService.deleteClub(this.club.id).subscribe({
        next: () => {
          alert("Club supprimé");
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error("Erreur suppression :", err);
          alert("Erreur lors de la suppression");
        }
      });
    }
  }

  checkIfFollowing() {
    if (!this.club?.id) return;
    const userId = this.authService.getUserId();
    debugger
    if (!userId) return;

    this.clubService.getClubFollowers(this.club.id).subscribe(followers => {
      this.isFollowing = followers.followers.includes(userId);
    });
  }


  toggleFollow() {
    if (!this.club || !this.club.id) {
      console.error("Club ou Club ID introuvable");
      return;
    }
    if (this.isFollowing) {
      debugger
      this.clubService.unfollowClub(this.club.id).subscribe(() => {
        this.isFollowing = false;
      });
    } else {
      debugger
      this.clubService.followClub(this.club.id).subscribe(() => {
        this.isFollowing = true;
      });
    }
  }
}