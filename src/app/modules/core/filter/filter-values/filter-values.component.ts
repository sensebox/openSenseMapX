import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() timeMode;
  @Input() stats;

  @Output() live = new EventEmitter();

  now = new Date();


  constructor(public translateService: TranslateService) { }

  ngOnInit() {
  }

  backToLive(){
    this.live.emit();
  }

}
