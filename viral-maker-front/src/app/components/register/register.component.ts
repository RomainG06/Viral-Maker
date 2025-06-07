import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-auth/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private supabase: SupabaseService, private router: Router) { }

  async register() {
    this.isLoading = true;
    this.errorMessage = null;

    const { data, error } = await this.supabase.signUp(this.email, this.password);

    this.isLoading = false;

    if (error) {
      this.errorMessage = error.message;
    } else {
      alert('Compte créé ✅ Vérifie ton email pour confirmer.');
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}

