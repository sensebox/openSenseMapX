import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'osem-box-follow',
  templateUrl: './box-follow.component.html',
  styleUrls: ['./box-follow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxFollowComponent implements OnInit {


  // legendSteps = new FormArray([]);
  title = "";

  legendForm = this.fb.group({
    legendSteps: new FormArray([]),
  });

  @Input() set selectedPheno(pheno){
    if(pheno && pheno.layer.paint['circle-color']){
      this.title = pheno.title;
      this.legendForm.controls.legendSteps = new FormArray([])
      let control = <FormArray>this.legendForm.controls.legendSteps;
      let prevControl = undefined;
      pheno.layer.paint['circle-color'].forEach((item, index) => {
        if(index > 2 && index % 2){
          let newCont = new FormGroup({
            value: new FormControl(item, [this.greaterThan(prevControl)]),
            color: new FormControl(pheno.layer.paint['circle-color'][index+1])
          })
          control.push(newCont)
          prevControl = newCont;
        }
      })
      // console.log("CONTROL",control);
      // control.controls.forEach((group:any, index) => {
      //   // console.log(group.get("value"));
      //   // console.log(index);selectedPheno
      //   if(index > 0){
      //     console.log("GROUPVALUE",group.get("value"))
      //     group.get['value'].setValidators(this.greaterThan('value'))
      //   }

      // })
    }
  };

  @Output() updatedLegend = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {
      this.title = res.boxName;
    });
  }

  anyFieldUpdated(){
    //TODO: CHECK HOW THIS WORKS FOR FORMGROUPS
    this.legendForm.markAllAsTouched();
  }

  updateLegend(){
    let flatSteps = [];
    this.legendForm.getRawValue().legendSteps.forEach(step => {
      flatSteps.push(step.value)
      flatSteps.push(step.color)
    })
    this.updatedLegend.emit(flatSteps);
  }

  addLegendStep(){
    let control = <FormArray>this.legendForm.controls.legendSteps;
    control.push(new FormGroup({
      value: new FormControl(""),
      color: new FormControl("")
    }))
  }

  removeLegendStep(i){
    let control = <FormArray>this.legendForm.controls.legendSteps;
    control.removeAt(i);
  }

  get legendStepsControls() {
    return <FormArray>this.legendForm.controls.legendSteps;
  }

  greaterThan(oldControl): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      var fieldToCompare;
      if(oldControl){
        fieldToCompare = oldControl.get('value').value;
      } else {
        fieldToCompare = -9999999;
      }
      // console.log("OLD", oldControl)
      const isLessThan = Number(fieldToCompare) > Number(control.value);
      return isLessThan ? {'lessThan': {value: control.value}} : null;
    }
  }
}
