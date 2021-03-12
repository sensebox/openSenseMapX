import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osem-filter-values',
  templateUrl: './filter-values.component.html',
  styleUrls: ['./filter-values.component.scss']
})
export class FilterValuesComponent implements OnInit {

  @Input() selectedPheno;
  @Input() selectedDate;
  @Input() filter;

  now = new Date();


  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

}
