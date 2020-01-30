import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'osem-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchTerm = "";

  @Output() changedSearchTerm = new EventEmitter();
  @Output() resultSelected = new EventEmitter();
  @Input() autoCompleteResults;

  selectedAutocomplete = -1;

  constructor() { }

  ngOnInit() {
  }

  changeSearchTerm(){
    this.changedSearchTerm.emit(this.searchTerm);
  }

  selectResult(box){
    this.resultSelected.emit(box);
  }

  keydown(key) {
    if(key.keyCode == 38){
      key.preventDefault()
      this.selectedAutocomplete--;
      if (this.selectedAutocomplete < 0){
        this.selectedAutocomplete = this.autoCompleteResults.length-1;
      }
    } else if(key.keyCode == 40) {
      key.preventDefault()
      this.selectedAutocomplete++;
      if(this.selectedAutocomplete >= this.autoCompleteResults.length){
        this.selectedAutocomplete = 0;
      }
    } else if(key.keyCode == 13){
      if(this.autoCompleteResults.length > 0 && this.selectedAutocomplete > -1) {
        // this.navToProduct(this.autoCompleteResults[this.selectedAutocomplete].slug);
        this.resultSelected.emit(this.autoCompleteResults[this.selectedAutocomplete])
        //HIGHLIGHT BOX
        // this.autoCompleteResults = [];
      } else {
        // this.router.navigate(['/parts']);
      }
    } 
  }

}
