import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'osem-legend-edit',
  templateUrl: './legend-edit.component.html',
  styleUrls: ['./legend-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendEditComponent implements OnInit {


  // legendSteps = new FormArray([]);

  legendForm = this.fb.group({
    legendSteps: new FormArray([]),
  });

  @Input() set selectedPheno(pheno){
    if(pheno && pheno.layer.paint['circle-color']){
      this.legendForm.controls.legendSteps = new FormArray([])
      let control = <FormArray>this.legendForm.controls.legendSteps;
      pheno.layer.paint['circle-color'].forEach((item, index) => {
        if(index > 2 && index % 2){
          control.push(new FormGroup({
            value: new FormControl(item),
            color: new FormControl(pheno.layer.paint['circle-color'][index+1])
          }))
        }
      })
    }
  };

  @Output() updatedLegend = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  updateLegend(){
    let flatSteps = [];
    this.legendForm.getRawValue().legendSteps.forEach(step => {
      flatSteps.push(step.value)
      flatSteps.push(step.color)
    })
    this.updatedLegend.emit(flatSteps);
  }

  addGroupedStep(){
    let control = <FormArray>this.legendForm.controls.legendSteps;
    control.push(new FormGroup({
      value: new FormControl(""),
      color: new FormControl("")
    }))
  }

  removeGroupedStep(i){
    let control = <FormArray>this.legendForm.controls.legendSteps;
    control.removeAt(i);
  }

  get legendStepsControls() {
    return <FormArray>this.legendForm.controls.legendSteps;
  }

}
