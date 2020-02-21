import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiQuery } from './models/ui/state/ui.query';
import { slideInOutHorizontalBoolean } from './helper/animations';
import { DateTimeAdapter } from 'ng-pick-datetime';

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
  infoPheno$ = this.uiQuery.selectInfoPheno$;


  constructor(
    private translate: TranslateService,
    private uiQuery: UiQuery,
    private dateTimeAdapter: DateTimeAdapter<any>){

      translate.setDefaultLang('de-DE');
      this.language$.subscribe(lang => {
        translate.use(lang);
        this.dateTimeAdapter.setLocale(lang);
      })
  }

  closeIntro(){
    this.intro = false;
  }
}
