import { EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'osem-profile-boxes-edit-general',
  templateUrl: './profile-boxes-edit-general.component.html',
  styleUrls: ['./profile-boxes-edit-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditGeneralComponent implements OnInit {
  

  _box;

  generalForm = this.builder.group({
    name: [null, Validators.required],
    exposure: ['outdoor', Validators.required],
    description: [null],
    tags: [null],
    connection: [null]
  }); 
  
  
  @Input() set box(box){
    this._box = box;
    if(box) {
      this.generalForm.patchValue(box);
    }
  };

  get box(): any {
    return this._box;
  }

  @Output() boxSaved = new EventEmitter();

  constructor(
    private builder: FormBuilder) { }

  ngOnInit() {

  }

  saveBox(){
    this.boxSaved.emit({
      ...this.generalForm.getRawValue(), 
      _id: this._box._id
    });
  }

}
