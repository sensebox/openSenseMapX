import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/models/ui/state/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'osem-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  startAt = new Date('2020-03-27T10:00:00.000Z');
  minDate = new Date('2020-03-27T10:00:00.000Z');
  maxDate = new Date('2020-03-27T14:00:00.000Z');

  now = new Date();
  
  @Input() dateRange;
  @Input() dateStamp;
  @Input() activeTimeMode;
  @Input() showDateModal;
  @Output() dateChanged = new EventEmitter<any>();
  @Output() toggledDateModal = new EventEmitter<any>();
  oldDates;

  constructor(
    private uiService: UiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.fromDate && params.toDate){
        const fromDate = new Date(params.fromDate);
        const toDate = new Date(params.toDate);
        if(!this.oldDates || (this.oldDates[0].getTime() != fromDate.getTime() || this.oldDates[1].getTime() != toDate.getTime())) {
          this.dateChanged.emit([fromDate, toDate]);
        }
       this.oldDates = [fromDate, toDate];
      } else if (this.dateRange) {
        this.uiService.setSelectedDate(null);
        this.dateChanged.emit(null);
      }
    })
  }

  dateChange(){
    this.selectDateRange(this.dateRange)
  }
  dateInput(range){
    // this.dateChanged.emit(this.dateRange)
  }

  selectDateRange(dateRange){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { fromDate: dateRange[0].toISOString(), toDate: dateRange[1].toISOString() },
        queryParamsHandling: 'merge'
      });
  }

  toggleDateModal(){
    this.toggledDateModal.emit(this.showDateModal);
  }

  closeModal(){
    this.toggledDateModal.emit(false);
  }

}
