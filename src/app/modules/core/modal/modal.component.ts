import { Component, OnInit } from '@angular/core';
import { UiQuery } from 'src/app/models/ui/state/ui.query';
import { UiService } from 'src/app/models/ui/state/ui.service';

@Component({
  selector: 'osem-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  infoPheno$ = this.uiQuery.selectInfoPheno$;

  constructor(private uiQuery: UiQuery, private uiService: UiService) { }

  ngOnInit() {
  }

  close(){
    this.uiService.setInfoPheno(null);
  }

  clickModal(e){
    e.stopPropagation();
  }
}
