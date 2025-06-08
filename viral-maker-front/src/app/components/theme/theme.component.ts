import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaptionService } from 'src/app/services/caption/caption.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {
  themeName: string = '';
  prePrompt: string = '';
  textPrompt: string = '';
  captionResult: string = '';
  captionLoading = false;
  captions: string = '';

  imagePrompt: string = '';
  imageBase64: string = '';
  imageLoading = false;

  constructor(
    private route: ActivatedRoute,
    private captionService: CaptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.themeName = this.route.snapshot.paramMap.get('name') || '';
    this.prePrompt = `Tu es un expert de "${this.themeName}" génere un résultat en utilisant un langage simple et accessible. tout en contenant des informations pertinentes et intéressantes sur le thème "${this.themeName}".`;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  testGenerateCaption(prompt: string) {
    this.captionLoading = true;
    this.captionResult = '';

    this.captionService.generateCaptions(this.prePrompt + ' ' + prompt).subscribe({
      next: (response) => {
        this.captionResult = response;
        this.captionLoading = false;
      },
      error: (err) => {
        this.captionLoading = false;
      }
    });
  }

  generateImage() {
    this.imageLoading = true;
    this.captionService.generateCaptionsImage(this.prePrompt + ' ' + this.imagePrompt).subscribe({
      next: (response) => {
        this.imageBase64 = response[0];
        this.imageLoading = false;
        console.log('Image générée avec succès', this.imageBase64);
      }
      , error: (err) => {
        this.imageLoading = false;
        console.error('Erreur lors de la génération de l\'image', err);
      }
    });
  }
}
