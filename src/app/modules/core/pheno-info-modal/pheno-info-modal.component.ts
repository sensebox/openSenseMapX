import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { appearModal } from 'src/app/helper/animations';

@Component({
  selector: 'osem-pheno-info-modal',
  templateUrl: './pheno-info-modal.component.html',
  styleUrls: ['./pheno-info-modal.component.scss'],
  animations: [appearModal]
})
export class PhenoInfoModalComponent implements OnInit, AfterViewInit {

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
