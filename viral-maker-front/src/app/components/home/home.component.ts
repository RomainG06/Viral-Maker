import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
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
}
