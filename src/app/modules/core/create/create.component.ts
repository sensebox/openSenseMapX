import { Component, OnInit } from '@angular/core';
import { FormDesign } from 'src/app/form';

@Component({
  selector: 'osem-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  phenomena = ['Air temperature',
               'Noise level',
               'PM10',
               'PM2.5'
              ];

  startDate: Date = new Date("2019-05-27");
  endDate: Date = new Date("2019-05-28");

  model = new FormDesign(1,
                          'Sound measurement campaign',
                          'Joseph Schwartz',
                          'I am retired and new in this neighbourhood.',
                          'My neighbourhood became loud.',
                          'My campaign goals are sound levels in my street.',
                          'I do not have speific details about my campaign.',
                          this.startDate,
                          this.endDate,
                          this.phenomena[0],
                          )

  submitted = false;

  onSubmit() {
              this.submitted = true;
            }


  constructor() { }

  ngOnInit() {
  }

}
