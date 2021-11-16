import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaigntypeComponent } from './campaigntype.component';

describe('CampaigntypeComponent', () => {
  let component: CampaigntypeComponent;
  let fixture: ComponentFixture<CampaigntypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaigntypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaigntypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
