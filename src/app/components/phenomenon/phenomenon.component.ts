import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osem-phenomenon',
  templateUrl: './phenomenon.component.html',
  styleUrls: ['./phenomenon.component.scss']
})
export class PhenomenonComponent implements OnInit {

  @Input() phenos;
  @Output() phenoSelected = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  selectPheno(pheno){
    this.phenoSelected.emit(pheno);
  }

}
