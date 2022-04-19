import { Component, OnInit, Input, Output } from '@angular/core';
import { AkitaNgFormsManager } from '@datorama/akita-ng-forms-manager';
import { FormBuilder, Validators } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { UiService } from 'src/app/models/ui/state/ui.service';

export interface FormsState {
  general: {
    name: string;
    description: string;
    exposure: string;
    tags: string[];
    connection: string;
  };
}


@Component({
  selector: 'osem-profile-box-create-general',
  templateUrl: './profile-box-create-general.component.html',
  styleUrls: ['./profile-box-create-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileBoxCreateGeneralComponent implements OnInit {
  @Input() selectedDevice;
  generalForm;
  tags;

  results:any = [];
  searchResults:any = [];

  constructor(
    private formsManager: AkitaNgFormsManager<FormsState>,
    private builder: FormBuilder,
    private uiService: UiService) { }

  ngOnInit() {
    this.generalForm = this.builder.group({
      name: [null, Validators.required],
      exposure: ['outdoor', Validators.required],
      description: [null],
      connection: [null]
    }); 
    this.formsManager.upsert('general', this.generalForm);

    this.getSearchResults();
  }

  getSearchResults(): void {
    this.uiService.fetchTags()
      .subscribe( sr => {
        Object.assign(this.searchResults, sr);
      })
  }

  onDeleteTag(event){
    console.log("deleting tag", event);
    const newArr = this.tags.filter(tag =>tag !== event)
    this.tags = newArr;
  }

  // how the hell to add to the tags array above ? 

  addToTags(event){
    console.log("get tag",this.generalForm.get('tags'));
    this.tags.push(event.target.value)
    this.tags.emit(event.target.value);
    this.generalForm.tags = this.tags;
  }

  searchTagsOnKeyUp(event){
    let input = event.target.value;
    if(input.length > 1){
      this.results = this.searchFromArray(this.searchResults, input);
    }  
  }

  searchFromArray(arr, regex) {
    let matches = [], i;
    for(i = 0; i < arr.length;i++){
      if(arr[i].match(regex)){
        matches.push(arr[i]);
      }
    }
    return matches;
  }

}
