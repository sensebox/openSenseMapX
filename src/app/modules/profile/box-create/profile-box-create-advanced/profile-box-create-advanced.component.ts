import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';


@Component({
  selector: 'osem-profile-box-create-advanced',
  templateUrl: './profile-box-create-advanced.component.html',
  styleUrls: ['./profile-box-create-advanced.component.scss']
})
export class ProfileBoxCreateAdvancedComponent implements OnInit, AfterViewInit {

  constructor(private builder: FormBuilder, private formsManager: AkitaNgFormsManager) { }

  public ttn;
  public mqtt;
  ttnForm;
  mqttForm;

  ngOnInit() {

    this.ttnForm = this.builder.group({
      useTTN: [false],
      profile: ['sensebox/home'],
      app_id: [null, Validators.required],
      dev_id: ['', Validators.required],
      decodeOptions: ['[]'],
      port: [null],
    }); 
    this.formsManager.upsert('ttn', this.ttnForm);
    
    
    this.mqttForm = this.builder.group({
      useMQTT: [false],
      url: [null, Validators.required],
      topic: [null, Validators.required],
      message_format: ['', Validators.required],
      decodeOptions: [null],
      connectionOptions: [null],
    });
    this.formsManager.upsert('mqtt', this.mqttForm);

  }
  ngAfterViewInit() {
    let ttnEle:any = document.getElementById('ttn');
    let mqttEle:any = document.getElementById('mqtt');
    bulmaCollapsible.attach(ttnEle, {allowMultiple: false});
    bulmaCollapsible.attach(mqttEle, {allowMultiple: false});

    this.addCollapseAction(ttnEle, mqttEle);
    this.addCollapseAction(mqttEle, ttnEle);

    ttnEle.bulmaCollapsible().on('before:expand', (e) => {
      this.ttnForm.controls.useTTN.setValue(true);
    })
    ttnEle.bulmaCollapsible().on('before:collapse', (e) => {
      this.ttnForm.controls.useTTN.setValue(false);
    })

    mqttEle.bulmaCollapsible().on('before:expand', (e) => {
      this.mqttForm.controls.useMQTT.setValue(true);
    })
    mqttEle.bulmaCollapsible().on('before:collapse', (e) => {
      this.mqttForm.controls.useMQTT.setValue(false);
    })
  }

  addCollapseAction(element, ele2){
    if (element) {

      element.bulmaCollapsible().on('before:expand', (e) => {
        ele2.bulmaCollapsible('collapse')
      });
    }
  }
}
