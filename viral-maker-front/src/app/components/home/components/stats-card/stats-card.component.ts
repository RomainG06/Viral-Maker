import { Component, Input } from '@angular/core';

export interface Stats {
    totalClubs: number;
    aiGenerations: number;
    totalPosts: number;
    followers: number;
}

@Component({
    selector: 'app-stats-card',
    templateUrl: './stats-card.component.html',
    styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
    @Input() stats: Stats = {
        totalClubs: 0,
        aiGenerations: 0,
        totalPosts: 0,
        followers: 0
    };
}
