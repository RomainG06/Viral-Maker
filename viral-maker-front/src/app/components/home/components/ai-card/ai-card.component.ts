import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-ai-card',
    templateUrl: './ai-card.component.html',
    styleUrls: ['./ai-card.component.css']
})
export class AiCardComponent {
    @Input() captions: string[] = [];
    @Output() generateClick = new EventEmitter<void>();
    @Output() generateLogo = new EventEmitter<void>();
    @Output() generatePoster = new EventEmitter<void>();
    @Output() generateAnnouncement = new EventEmitter<void>();
    @Output() generateMatchStory = new EventEmitter<void>();

    onGenerateClick(): void {
        this.generateClick.emit();
    }

    onGenerateLogo(): void {
        this.generateLogo.emit();
    }

    onGeneratePoster(): void {
        this.generatePoster.emit();
    }

    onGenerateAnnouncement(): void {
        this.generateAnnouncement.emit();
    }

    onGenerateMatchStory(): void {
        this.generateMatchStory.emit();
    }
}
