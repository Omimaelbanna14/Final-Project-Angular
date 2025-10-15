import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations"
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/Header/header-interceptor';
import { errorInterceptor } from './core/interceptors/Error/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withViewTransitions(), withHashLocation()),
    importProvidersFrom(BrowserAnimationsModule, NgxSpinnerModule, NgxPaginationModule ),
    provideHttpClient( withFetch() , withInterceptors([headerInterceptor , errorInterceptor , loadingInterceptor]) ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    importProvidersFrom(CookieService),
    provideToastr(),
    // { provide: LocationStrategy, useClass: HashLocationStrategy },

  ]
};
