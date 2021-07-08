import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarBreadcrumbsComponent } from './sidebar-breadcrumbs.component';

describe('SidebarBreadcrumbsComponent', () => {
  let component: SidebarBreadcrumbsComponent;
  let fixture: ComponentFixture<SidebarBreadcrumbsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
