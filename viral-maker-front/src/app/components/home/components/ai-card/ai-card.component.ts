import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-ai-card',
    templateUrl: './ai-card.component.html',
    styleUrls: ['./ai-card.component.css']
})
export class AiCardComponent {
    @Input() captions: string[] = [];
    @Output() generateClick = new EventEmitter<void>();

    onGenerateClick(): void {
        this.generateClick.emit();
    }
}
