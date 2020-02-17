import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osem-pheno-info',
  templateUrl: './pheno-info.component.html',
  styleUrls: ['./pheno-info.component.scss']
})
export class PhenoInfoComponent implements OnInit {

  @Input() infoPheno;

  constructor() { }

  ngOnInit() {
  }

}
