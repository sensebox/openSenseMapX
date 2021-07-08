import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'osem-sidebar-breadcrumbs',
  templateUrl: './sidebar-breadcrumbs.component.html',
  styleUrls: ['./sidebar-breadcrumbs.component.scss']
})
export class SidebarBreadcrumbsComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  menuItems;

  ngOnInit() {
    this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.menuItems = this.createBreadcrumbs(this.activatedRoute.root));
  }


  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs = []) {
    this.menuItems = null;
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['name'];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({url, label});
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}

