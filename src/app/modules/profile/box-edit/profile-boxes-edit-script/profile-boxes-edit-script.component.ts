import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'osem-profile-boxes-edit-script',
  templateUrl: './profile-boxes-edit-script.component.html',
  styleUrls: ['./profile-boxes-edit-script.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxesEditScriptComponent implements OnInit {

  @Input() box;
  @Output() scriptGenerated = new EventEmitter();
  @Output() scriptCompiled = new EventEmitter();

  scriptForm = this.builder.group({
    connection: ['wifi'],
    serialPort: ['Serial1'],
    soilDigitalPort: ['A'],
    soundMeterPort: ['B'],
    windSpeedPort: ['C'],
    display_enabled: [false],
    ssid: [''],
    password: ['']
  }); 

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.scriptForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((val) => this.generateScript())    
    ).subscribe()
  }

  generateScript(){
    this.scriptGenerated.emit({id: this.box._id, data: this.scriptForm.getRawValue()});
  }

  compileScript(){
    this.scriptCompiled.emit({
      board: 'sensebox-mcu',
      sketch: this.box.script
    });
  }

}
