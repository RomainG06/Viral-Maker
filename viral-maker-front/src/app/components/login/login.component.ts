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

  constructor(private supabase: SupabaseService, private router: Router) { }

  async login() {
    const { data, error } = await this.supabase.signIn(this.email, this.password);
    if (error) {
      alert(error.message);
    } else {
      alert('Connecté ✅');
      const accessToken = data.session?.access_token;
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
      }
      console.log(data);
      console.log(accessToken)
      this.router.navigate(['/home']);
    }
  }
}
