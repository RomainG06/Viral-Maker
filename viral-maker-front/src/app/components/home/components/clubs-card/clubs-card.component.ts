import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Club } from 'src/app/models/club';

@Component({
    selector: 'app-clubs-card',
    templateUrl: './clubs-card.component.html',
    styleUrls: ['./clubs-card.component.css']
})
export class ClubsCardComponent {
    @Input() userClubs: Club[] = [];
    @Input() isLoading: boolean = false;
    @Output() clubClick = new EventEmitter<string>();
    @Output() viewAllClick = new EventEmitter<void>();

    onClubClick(slug: string | undefined): void {
        if (slug) {
            this.clubClick.emit(slug);
        }
    }

    onViewAllClick(): void {
        this.viewAllClick.emit();
    }
}
