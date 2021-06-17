import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenoInfoModalComponent } from './pheno-info-modal.component';

describe('PhenoInfoModalComponent', () => {
  let component: PhenoInfoModalComponent;
  let fixture: ComponentFixture<PhenoInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhenoInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhenoInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
