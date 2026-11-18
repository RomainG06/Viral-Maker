import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { SportComponent } from './components/sport/sport.component';
import { CreateClubComponent } from './components/create-club/create-club.component';
import { MyClubsComponent } from './pages/my-clubs/my-clubs.component';
import { ExploreClubsComponent } from './pages/explore-clubs/explore-clubs.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'sport/:name', component: SportComponent, canActivate: [AuthGuard] },
  { path: 'create-club', component: CreateClubComponent, canActivate: [AuthGuard] },
  { path: 'my-clubs', component: MyClubsComponent },
  { path: 'explore', component: ExploreClubsComponent },
  { path: 'club/:slug', component: ClubDetailsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
