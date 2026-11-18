import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { Sport } from 'src/app/models/theme';
import { ClubService } from 'src/app/services/club/club.service';
import { SportService } from 'src/app/services/sport/sport.service';
import { SupabaseService } from 'src/app/services/supabase-auth/supabase.service';
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
  selectedFile: File | null = null;
  logoUrl: string = '';
  previewUrl: string | null = null;

  constructor(
    private clubService: ClubService,
    private sportService: SportService,
    private router: Router,
    private supabase: SupabaseService
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadLogo();
    }
  }

  removeLogo() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.club.logo_url = undefined;
  }

  async uploadLogo() {
    if (!this.selectedFile) return;

    const fileExt = this.selectedFile.name.split('.').pop();
    const fileName = `private/${Date.now()}.${fileExt}`;
    const { data, error } = await this.supabase.uploadLogo(this.selectedFile, fileName);

    if (error) {
      console.error('Erreur upload :', error);
      debugger
      return;
    }

    const publicUrl = this.supabase.getPublicUrl(fileName);
    this.club.logo_url = publicUrl;
    debugger
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.uploadLogo();
      event.dataTransfer.clearData();
    }
  }

  onSubmit(): void {
    if (!this.club.name || !this.club.description || !this.club.sport_id || !this.club.city || !this.club.user_id_owner || !this.club.logo_url) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.clubService.createClub(this.club).subscribe({
      next: (createdClub) => {
        alert('Club créé avec succès !');
        this.router.navigate(['/club', createdClub.slug]);
      },
      error: (err) => {
        console.error('Erreur création club', err);
        alert('Erreur lors de la création du club.');
      }
    });
  }
}
