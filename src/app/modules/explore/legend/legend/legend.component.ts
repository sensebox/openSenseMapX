import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'osem-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnInit {

  @Input() selectedPheno;
  @Input() gradient;
  @Input() legendVisible;
  @Input() stats;

  @Output() legendToggled = new EventEmitter();
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  
  toggleLegend(){
    this.legendToggled.emit();
  }

  editLegend() {
    this.router.navigate(
      [{outlets: {modal: 'edit-legend'}}],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge'
      }
    ); 
  }

}
