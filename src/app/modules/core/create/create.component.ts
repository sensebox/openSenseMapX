import { Component, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { PhenomenaService } from '../services/phenomena.service';

@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  phenomena

  startDate: Date;
  endDate: Date;

  model = new FormDesign();

  submitted = false;

  onSubmit() {
              this.submitted = true;
            }


  constructor(private phenomenaService: PhenomenaService) { }

  ngOnInit(): void {
    this.phenomena = this.phenomenaService.getPhenomena();
  }

}
