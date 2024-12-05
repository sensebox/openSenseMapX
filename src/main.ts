import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from "@sentry/tracing";

// Init Sentry as soon as possible during application load up and before initializing Angular
// https://docs.sentry.io/platforms/javascript/guides/angular/configuration/options/
Sentry.init({
  environment: (environment.production) ? 'production' : 'development',
  dsn: "https://3dca81a89894465e8cc92852c7c36db8@o507029.ingest.sentry.io/5891080",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode } from '@datorama/akita';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
