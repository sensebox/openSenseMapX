import { SessionQuery } from 'src/app/models/session/state/session.query';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'osem-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.scss']
})
export class NavContainerComponent implements OnInit {

  settings:Boolean = false;
  notifications:Boolean = false;

  notifications$ = this.notificationService.notifications;

  language$ = this.uiQuery.selectLanguage$;
  theme$ = this.uiQuery.selectTheme$;
  user$ = this.sessionQuery.user$;
  clustering$ = this.uiQuery.selectClustering$;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private uiService: UiService,
    private uiQuery: UiQuery,
    private sessionQuery: SessionQuery,
    private notificationService: NotificationService
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
  toggleClustering(){
    this.uiService.toggleClustering();
  }
  toggleNotifications(){
    this.notifications = !this.notifications;
  }

}
