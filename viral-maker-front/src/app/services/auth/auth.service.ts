import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase-auth/supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userId: string | null = null;

  constructor(private supabase: SupabaseService) { }

  async initUser(): Promise<void> {
    if (!this.userId) {
      this.userId = await this.supabase.getUserId();
    }
  }

  getUserId(): string | null {
    return this.userId;
  }
}
