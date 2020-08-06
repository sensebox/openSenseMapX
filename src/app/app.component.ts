import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiQuery } from './models/ui/state/ui.query';
import { slideInOutHorizontalBoolean, routingFadeIn, appearModal } from './helper/animations';
import { DateTimeAdapter } from 'ng-pick-datetime';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './models/session/state/session.service';

@Component({
  selector: 'osem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutHorizontalBoolean, routingFadeIn, appearModal]
})
export class AppComponent {

  title = 'openSenseMapX';
  intro = true;
  backdrop = false;

  language$ = this.uiQuery.selectLanguage$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;
  infoPheno$ = this.uiQuery.selectInfoPheno$;


  constructor(
    private translate: TranslateService,
    private router: Router,
    private uiQuery: UiQuery,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private dateTimeAdapter: DateTimeAdapter<any>){

      translate.setDefaultLang('de-DE');
      this.language$.subscribe(lang => {
        translate.use(lang);
        this.dateTimeAdapter.setLocale(lang);
      })

      if(window.localStorage.getItem('sb_refreshtoken'))
        this.sessionService.recoverSession(window.localStorage.getItem('sb_refreshtoken'))

  }

  closeIntro(){
    this.intro = false;
  }

  onModalActivate($event){
    this.backdrop = true;
  }
  
  onModalDeactivate($event){
    this.backdrop = false;
  }
    // close modal on esc
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.keyCode == 27){
      this.closeModal();
    }
  }

  closeModal(){
    this.router.navigate(
      [{outlets: {modal: null}}],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      }
    );
  }

  closeSidebar(){
    this.router.navigate(
      [{outlets: {sidebar: null}}],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      }
    );
  }
}
