import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiQuery } from './models/ui/state/ui.query';
import { slideInOutHorizontalBoolean } from './helper/animations';

@Component({
  selector: 'osem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutHorizontalBoolean]
})
export class AppComponent {

  title = 'openSenseMapX';
  intro = true;

  language$ = this.uiQuery.selectLanguage$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;


  constructor(
    private translate: TranslateService,
    private uiQuery: UiQuery){

      translate.setDefaultLang('de');
      this.language$.subscribe(lang => {
        translate.use(lang);
      })
  }

  closeIntro(){
    this.intro = false;
  }
}
