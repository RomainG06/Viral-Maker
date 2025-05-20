import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private supabase: SupabaseService, private router: Router) { }

    async canActivate(): Promise<boolean | UrlTree> {
        const { data } = await this.supabase.getUser();

        if (!data.user) {
            return this.router.parseUrl('/login');
        }

        return true;
    }
}
