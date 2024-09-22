import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { NotificationService } from 'src/app/data/service/notification.service';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {});
