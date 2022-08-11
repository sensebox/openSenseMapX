import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { slideInOutAnimation } from "src/app/helper/animations";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { UiStore } from "src/app/models/ui/state/ui.store";
import { MapService } from "../../services/map.service";
import { BoxService } from "src/app/models/box/state/box.service";
import { UiService } from "src/app/models/ui/state/ui.service";

@Component({
  selector: "osem-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
  animations: [slideInOutAnimation],
})
export class UserProfileComponent implements OnInit {
  username: string;
  email: string;
  boxes: any[] = [];
  boxesLoaded = false;
  allBadges: any[] = [];
  allBadgesLoaded = false;
  userBadges: any[] = [];
  userBadgesLoaded = false;
  boxIndex = 0;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private mapService: MapService,
    private boxService: BoxService
  ) {
    this.boxService.setPopupBox(null);
  }

  ngOnInit() {
    this.uiService.setFilterVisible(false);
    this.getUserData();
    this.getBadges();
  }

  getBadges() {
    this.http.get(environment.api_url + "/badges").subscribe((data: any) => {
      // remove all badges that are already earned by the user
      // query all badges
      for (let badge of data) {
        // add badge to array of all badges that are not earned by the user
        this.allBadges.push(badge);
        // query all badges that the user has earned
        for (let userBadge of this.userBadges) {
          // if the user has earned the badge, remove it from the array of all badges
          if (userBadge.badgeclass == badge.entityId) {
            this.allBadges.pop();
          }
        }
      }
      this.allBadgesLoaded = true;
    });
  }

  getUserData() {
    this.activatedRoute.params.subscribe((params) => {
      this.http
        .get(environment.api_url + "/users/info/" + params.username)
        .subscribe(
          (data: any) => {
            if (data.user === null) {
              this.router.navigate([""], {
                relativeTo: this.activatedRoute,
                queryParamsHandling: "merge",
              });
            }
            this.username = data.user.name;
            this.userBadges = data.badges;
            this.userBadgesLoaded = true;
          },
          (err) => {
            this.router.navigate([""], {
              relativeTo: this.activatedRoute,
              queryParamsHandling: "merge",
            });
          }
        );

      this.getBoxes(params.username);
    });
  }

  getBoxes(username) {
    this.http
      .get(environment.api_url + "/boxes/user/" + username)
      .subscribe((data: any) => {
        // delete all null values from boxes array
        var boxes = data.filter((box) => {
          return box !== null;
        });
        this.boxes = boxes;
        this.boxesLoaded = true;
      });
  }

  closeBox() {
    this.router.navigate([""], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: "merge",
    });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  goToBox(box) {
    this.closeBox();
    this.mapService.flyTo(box.currentLocation.coordinates);
    this.mapService.map.once("moveend", () => {
      this.boxService.setPopupBox(box);
    });
  }

  selectBox(index) {
    this.boxIndex = index;
  }
}
