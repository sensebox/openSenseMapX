import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';

@Component({
  selector: 'osem-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.scss']
})
export class NavContainerComponent implements OnInit {

  settings:Boolean = false;

  language$ = this.uiQuery.selectLanguage$;
  theme$ = this.uiQuery.selectTheme$;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private uiService: UiService,
    private uiQuery: UiQuery,
    ) { }

  ngOnInit() {
  }

  toggleTheme(theme){
    this.uiService.setTheme(theme);
    // this.themeService.toggleTheme();
  }
  setLanguage(lang){
    this.uiService.setLanguage(lang);
  }
  toggleSettings(){
    this.settings = !this.settings;
  }

}
