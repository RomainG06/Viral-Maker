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
import { StatsCardComponent } from './components/home/components/stats-card/stats-card.component';
import { AiCardComponent } from './components/home/components/ai-card/ai-card.component';
import { ClubsCardComponent } from './components/home/components/clubs-card/clubs-card.component';
import { EventsCardComponent } from './components/home/components/events-card/events-card.component';
import { CaptionComponent } from './components/caption/caption.component';

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
    ClubDetailsComponent,
    StatsCardComponent,
    AiCardComponent,
    ClubsCardComponent,
    EventsCardComponent,
    CaptionComponent
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
