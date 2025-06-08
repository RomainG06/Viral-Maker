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
  imageResult: string = '';
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
    this.captionService.generateCaptions(this.prePrompt + '' + prompt).subscribe({
      next: (response) => {
        console.log('Captions générées avec succès:', response);
        this.captions = response.captions;
        console.log(this.captions);
      },
      error: (err) => {
        console.error('Erreur lors de la génération des captions', err);
      }
    });
  }

  generateImage() {
    /*  if (!this.imagePrompt) return;
     this.imageLoading = true;
     this.apiService.post('/generate-image', { prompt: this.imagePrompt })
       .subscribe({
         next: (res: any) => {
           this.imageResult = res.image_url;
           this.imageLoading = false;
         },
         error: () => {
           this.imageResult = '';
           this.imageLoading = false;
         }
       }); */
  }
}
