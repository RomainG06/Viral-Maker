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

  ngOnInit() {
    var menuBtn = document.getElementById('menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
      });
    }

    this.creditsService.getCredits().subscribe(res => {
      let credits = res.credits;
      document.getElementById("credits-display")!.innerText = `Crédits: ${credits}`;
      document.getElementById("mobile-credits-display")!.innerText = `Crédits: ${credits}`;
    });
  }

}