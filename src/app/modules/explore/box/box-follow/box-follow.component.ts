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

  title: string = "";

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(res => {this.title = res.boxName;
    });
  }

}
