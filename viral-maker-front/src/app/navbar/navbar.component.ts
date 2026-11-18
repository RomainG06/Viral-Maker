import { Component } from '@angular/core';
import { CreditsService } from '../services/credit/credits.service';
import { Credits } from '../models/credits';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private creditsService: CreditsService) { }
  credits: Credits | undefined;
  isLoggedIn = false;

  ngOnInit() {
    var menuBtn = document.getElementById('menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
      });
      this.refreshCredits();
    }

    this.creditsService.getCredits().subscribe(res => {
      let credits = res.credits;
      document.getElementById("credits-display")!.innerText = `Crédits: ${credits}`;
      document.getElementById("mobile-credits-display")!.innerText = `Crédits: ${credits}`;
    });
    this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  buyCredits() {
    this.creditsService.purchaseCredits(50).subscribe({
      next: (res) => {
        console.log('Achat de crédits réussi:', res);
        alert(res.message);
        this.refreshCredits();
      },
      error: (err) => {
        console.error('Erreur lors de l\'achat de crédits:', err);
        alert(err);
      }
    });
  }

  refreshCredits() {
    this.creditsService.getCredits().subscribe({
      next: (res) => {
        this.credits = res.credits_remaining;
      }
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload(); // ou mieux : this.router.navigate(['/login']);
  }

}