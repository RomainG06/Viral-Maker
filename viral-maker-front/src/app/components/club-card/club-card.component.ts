import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-card',
  templateUrl: './club-card.component.html',
  styleUrls: ['./club-card.component.css']
})
export class ClubCardComponent {
  constructor(private router: Router) { }
  @Input() club!: {
    name: string;
    description: string;
    city: string;
    logo_url?: string;
    sport_name?: string;
    slug?: string;
  };

  goToDetails() {
    this.router.navigate(['/club', this.club.slug]);
  }
}
