import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiQuery } from './models/ui/state/ui.query';

@Component({
  selector: 'osem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'openSenseMapX';

  language$ = this.uiQuery.selectLanguage$;

  constructor(
    private translate: TranslateService,
    private uiQuery: UiQuery){

      translate.setDefaultLang('en');
      this.language$.subscribe(lang => {
        translate.use(lang);
      })
  }
}
