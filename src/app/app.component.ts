import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiQuery } from './models/ui/state/ui.query';
import { slideInOutHorizontalBoolean, routingFadeIn, appearModal, appearSlow } from './helper/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './models/session/state/session.service';
import { UiService } from './models/ui/state/ui.service';
import { WebsocketService } from './services/websocket.service';
import { PhenomenonService } from './models/phenomenon/state/phenomenon.service';
import { UnitService } from './models/unit/state/unit.service';
import * as bulmaToast from 'bulma-toast'
import { ToasterConfig, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'osem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutHorizontalBoolean, routingFadeIn, appearModal, appearSlow]
})
export class AppComponent {

  title = 'openSenseMapX';
  intro = true;
  backdrop = false;

  language$ = this.uiQuery.selectLanguage$;
  filterVisible$ = this.uiQuery.selectFilterVisible$;
  infoPheno$ = this.uiQuery.selectInfoPheno$;
  showDateModal$ = this.uiQuery.selectShowDateModal$;

  toastConfig = new ToasterConfig({
    showCloseButton: true
  });


  constructor(
    private translate: TranslateService,
    private router: Router,
    private uiQuery: UiQuery,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private webSocketService: WebsocketService,
    private phenoService: PhenomenonService,
    private unitService: UnitService,
    private toasterService: ToasterService,
    private uiService: UiService){

      //set default language to german, TODO: check browser language
      translate.setDefaultLang('de_DE');
      this.language$.subscribe(lang => {
        translate.use(lang);
      })

      // check if a refreshtoken is in localstorage and recover the sesssion
      if(window.localStorage.getItem('sb_refreshtoken'))
        this.sessionService.recoverSession(window.localStorage.getItem('sb_refreshtoken'))

      // get stats from the API (boxes, measurements, measurements/min)
      this.uiService.fetchStats().subscribe();

      // get all the phenomenons and units that can be displayed on opensensemap (maybe find better way to do this? e.g. populate in sensor wiki)
      this.phenoService.get().subscribe();
      this.unitService.get().subscribe();

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
