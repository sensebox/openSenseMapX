import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { appearModal } from 'src/app/helper/animations';

@Component({
  selector: 'osem-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [appearModal]
})
export class ModalComponent implements OnInit, AfterViewInit {

  infoPheno$ = this.uiQuery.selectInfoPheno$;

  animation = false;

  constructor(private uiQuery: UiQuery, private uiService: UiService) { }

  ngOnInit() {
  }
  
  ngAfterViewInit(){
    this.animation = true;
  }


  close(){
    this.uiService.setInfoPheno(null);
  }

  clickModal(e){
    e.stopPropagation();
  }
}
