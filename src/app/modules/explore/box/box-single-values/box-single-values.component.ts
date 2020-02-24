import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, AfterViewChecked, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Box } from 'src/app/models/box/state/box.model';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'osem-box-single-values',
  templateUrl: './box-single-values.component.html',
  styleUrls: ['./box-single-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxSingleValuesComponent implements OnChanges, AfterViewChecked {

  @Input() box: Box;
  @Input() colors;
  @Input() detect;
  @Input() windowWidth;
  @Input() scrollDivWidth;
  
  @Input() activeSensorTypes;
  @Input() activeSensors;
  
  @Output() valueSelected = new EventEmitter();
  @Output() valueAdded = new EventEmitter();
  @Output() boxClosed = new EventEmitter();
  @Output() sizeChanged = new EventEmitter();

  @ViewChild('sensors', {static: false}) sensorsDiv: ElementRef;
  @ViewChild('scrollable', {static: false}) scrollableDiv: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslateService) { }

  selectValue(sensor){
    this.valueSelected.emit(sensor);
  }
  
  addValue(sensor) {
    this.valueAdded.emit(sensor);
  }

  closeBox(){
    this.boxClosed.emit();
  }

  ngOnChanges(){
    if(this.sensorsDiv && this.sensorsDiv.nativeElement.scrollWidth != this.scrollDivWidth)
      this.sizeChanged.emit([this.sensorsDiv.nativeElement.scrollWidth, window.innerWidth])
  }

  ngAfterViewChecked(){
    if(this.sensorsDiv && this.sensorsDiv.nativeElement.scrollWidth != this.scrollDivWidth)
      this.sizeChanged.emit([this.sensorsDiv.nativeElement.scrollWidth, window.innerWidth])
  }

  public scrollRight(): void {
    this.scrollableDiv.nativeElement.scrollTo({ left: (this.scrollableDiv.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.scrollableDiv.nativeElement.scrollTo({ left: (this.scrollableDiv.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  @HostListener('window:resize', ['$event.target']) 
  onResize(event) { 
    this.sizeChanged.emit([this.sensorsDiv.nativeElement.scrollWidth, event.innerWidth])
  }
  
  openCompare(id){
    this.router.navigate(
      ['compare'], 
      {
        queryParams: { id: id},
        queryParamsHandling: 'merge'
      }
    );  }
}
