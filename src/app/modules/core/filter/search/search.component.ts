import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appear } from 'src/app/helper/animations';

@Component({
  selector: 'osem-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appear],
})
export class SearchComponent implements OnInit {

  public searchTerm = "";

  @Output() changedSearchTerm = new EventEmitter();
  @Output() resultSelected = new EventEmitter();
  @Input() autoCompleteResults;
  @Input() locationAutocompleteResults;
  
  showAll = false;

  autocompleteToShow;

  resultsActive = false;
  debounceTimeout;

  selectedAutocomplete = -1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.showAll = false;
    this.autocompleteToShow = this.autoCompleteResults.slice(0,4);

  }

  changeSearchTerm(){
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      if(this.searchTerm.length > 1){
        this.changedSearchTerm.emit(this.searchTerm);
      } else {
        this.changedSearchTerm.emit("");
      }

    }, 250);
  }

  keydown(key) {
    if(key.keyCode == 38){
      key.preventDefault()
      this.selectedAutocomplete--;
      if (this.selectedAutocomplete < 0){
        this.selectedAutocomplete = this.autocompleteToShow.length-1;
      }
    } else if(key.keyCode == 40) {
      key.preventDefault()
      this.selectedAutocomplete++;
      if(this.selectedAutocomplete >= this.autocompleteToShow.length + this.locationAutocompleteResults.length){
        this.selectedAutocomplete = 0;
      }
    } else if(key.keyCode == 13){
      if(this.autocompleteToShow.length > 0 && this.selectedAutocomplete > -1) {
        // this.navToProduct(this.autocompleteToShow[this.selectedAutocomplete].slug);
        this.resultSelected.emit(this.autocompleteToShow[this.selectedAutocomplete])
        //HIGHLIGHT BOX
        // this.autoCompleteResults = [];
      } else {
        // this.router.navigate(['/parts']);
      }
    } 
  }

  openDetails(box){
    // e.stopPropagation();
    this.router.navigate(['/explore/' + box._id], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });  
  }

  selectResult(e, box){
    e.stopPropagation();
    this.resultSelected.emit(box);
  }

  selectLocationResult(box){
    // e.stopPropagation();
    // this.router.navigate(['/explore/' + box._id], {
    //   relativeTo: this.activatedRoute,
    //   queryParamsHandling: 'merge'
    // });  
  }

  showLocationResult(e, box){
    // e.stopPropagation();
    // this.resultSelected.emit(box);
  }

  enter(){
    this.resultsActive = true;
  }
  leave(){
    let that = this;
    setTimeout(function(){
      that.resultsActive = false;
    },100)
  }

  displayAll(){
    this.showAll = !this.showAll;
    if(!this.showAll){
      this.autocompleteToShow = this.autoCompleteResults.slice(0,4);
    } else {
      this.autocompleteToShow = this.autoCompleteResults;
    }
  }

}
