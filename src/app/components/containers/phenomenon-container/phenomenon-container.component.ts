import { Component, OnInit } from '@angular/core';
import { BoxService } from 'src/app/models/box/state/box.service';

@Component({
  selector: 'osem-phenomenon-container',
  templateUrl: './phenomenon-container.component.html',
  styleUrls: ['./phenomenon-container.component.scss']
})
export class PhenomenonContainerComponent implements OnInit {

  phenos = ['Temperatur', 'Temperature', 'Luftdruck', 'Luftfeuchte', 'Humidity']

  constructor(private boxService: BoxService) { }

  ngOnInit() {
  }

  selectPheno(pheno){
    console.log(pheno);
    // this.boxService.getValue(pheno).subscribe();
  }

}
