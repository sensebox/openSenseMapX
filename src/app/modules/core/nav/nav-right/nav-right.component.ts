import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { slideInOutMenu } from "src/app/helper/animations";
import { SessionQuery } from "src/app/models/session/state/session.query";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "osem-nav-right",
  templateUrl: "./nav-right.component.html",
  styleUrls: ["./nav-right.component.scss"],
  animations: [slideInOutMenu],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavRightComponent implements OnInit {
  loggedIn$ = this.sessionQuery.isLoggedIn$;

  @Output() themeToggled = new EventEmitter();
  @Output() languageToggled = new EventEmitter();
  @Output() settingsToggled = new EventEmitter();
  @Output() clusteringToggled = new EventEmitter();
  @Output() notificationsToggled = new EventEmitter();

  @Input() theme;
  @Input() language;
  @Input() settings;
  @Input() user;
  @Input() clustering;
  @Input() notifications;

  notificationAlert = false;

  constructor(
    private sessionQuery: SessionQuery,
    private notificationService: NotificationService
  ) {
    this.notificationService.notifications.subscribe((notifications) => {
      if (notifications.length > 0) {
        this.notificationAlert = true;
      } else {
        this.notificationAlert = false;
      }
    });
  }

  ngOnInit() {}

  toggleTheme(them) {
    if (them === "light") {
      this.themeToggled.emit("dark");
    } else {
      this.themeToggled.emit("light");
    }
  }

  toggleLanguage(lang) {
    if (lang === "de-DE") {
      this.languageToggled.emit("en-US");
    } else {
      this.languageToggled.emit("de-DE");
    }
  }

  toggleSettings() {
    this.settingsToggled.emit();
  }

  toggleClustering() {
    this.clusteringToggled.emit();
  }

  toggleNotifications() {
    this.notificationsToggled.emit();
  }
}
