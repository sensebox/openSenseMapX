import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { slideInOutAnimation } from "src/app/helper/animations";
import { environment } from "src/environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { UiStore } from "src/app/models/ui/state/ui.store";
import { MapService } from "../../services/map.service";
import { BoxService } from "src/app/models/box/state/box.service";

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
  badges: any[] = [];
  badgesLoaded = false;
  userIsPrivate;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uiStore: UiStore,
    private mapService: MapService,
    private boxService: BoxService
  ) {
    this.boxService.setPopupBox(null);
  }

  ngOnInit() {
    this.uiStore.update((state) => ({ ...state, fitlerVisible: false }));
    this.activatedRoute.params.subscribe((params) => {
      this.http
        .get(environment.api_url + "/users/info/" + params.username)
        .subscribe(
          (data: any) => {
            console.log("User info: ", data);

            this.username = data.user.name;
            this.email = data.user.email;

            this.http
              .get(environment.api_url + "/badges/getBackpack/" + this.email)
              .subscribe((data: any) => {
                this.badges = data;
                this.badgesLoaded = true;
                console.log("Badges: ", data);
              });
          },
          (err) => {
            console.log(err);
            if (err.status === 403) {
              this.userIsPrivate = true;
            }
          }
        );

      this.http
        .get(environment.api_url + "/boxes/user/" + params.username)
        .subscribe((data: any) => {
          console.log("Boxes: ", data);
          this.boxes = data;
          this.boxesLoaded = true;
        });
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
}
