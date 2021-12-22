import { Component, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { PhenomenaService } from '../services/phenomena.service';


@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  phenomena

  model = new FormDesign();

  submitted = false;

  onSubmit() {
              this.submitted = true;
            }


  constructor(private phenomenaService: PhenomenaService,
    private uiService: UiService) { }

  ngOnInit(): void {
    this.phenomena = this.phenomenaService.getPhenomena();
    this.uiService.setFilterVisible(false);
  }

}
