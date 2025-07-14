import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SportComponent } from './components/sport/sport.component';
import { CreateClubComponent } from './components/create-club/create-club.component';
import { MyClubsComponent } from './pages/my-clubs/my-clubs.component';
import { ClubCardComponent } from './components/club-card/club-card.component';
import { ExploreClubsComponent } from './pages/explore-clubs/explore-clubs.component';
import { ClubDetailsComponent } from './pages/club-details/club-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SportComponent,
    ProfileComponent,
    RegisterComponent,
    CreateClubComponent,
    MyClubsComponent,
    ClubCardComponent,
    ExploreClubsComponent,
    ClubDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
