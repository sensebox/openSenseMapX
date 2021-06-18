import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhenoInfoComponent } from './pheno-info.component';

describe('PhenoInfoComponent', () => {
  let component: PhenoInfoComponent;
  let fixture: ComponentFixture<PhenoInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
