import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://vukkrjlgunefvglgetib.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1a2tyamxndW5lZnZnbGdldGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1ODI2MTEsImV4cCI6MjA2MzE1ODYxMX0.1HOpQvumF2oBoVSEysywGJUTUuBb2OxbjvQbC2cJu6Y'
    );
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  async getUserId(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error || !data.user) {
      console.error('Erreur récupération user', error);
      return null;
    }
    return data.user.id;
  }
}
