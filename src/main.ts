import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Dodaj ovaj import
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig, // Zadržavamo postojeći config
  providers: [
    ...(appConfig.providers || []), // Osiguravamo da postojeći provideri ostanu
    provideHttpClient(), // Dodajemo HttpClient ovde
  ],
}).catch((err) => console.error(err));
