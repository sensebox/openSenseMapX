import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBreadcrumbsComponent } from './sidebar-breadcrumbs.component';

describe('SidebarBreadcrumbsComponent', () => {
  let component: SidebarBreadcrumbsComponent;
  let fixture: ComponentFixture<SidebarBreadcrumbsComponent>;

  beforeEach(async(() => {
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
