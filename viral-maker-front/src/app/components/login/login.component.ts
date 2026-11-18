import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase-auth/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private supabase: SupabaseService, private router: Router) { }

  async login() {
    this.isLoading = true;
    this.errorMessage = null;
    const { data, error } = await this.supabase.signIn(this.email, this.password);
    this.isLoading = false;
    if (error) {
      this.errorMessage = error.message;
    } else {
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('refresh_token', data.session.refresh_token);
      this.router.navigate(['/home']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

}
