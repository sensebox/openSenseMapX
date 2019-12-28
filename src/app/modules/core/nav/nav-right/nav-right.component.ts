import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { slideInOutMenu } from 'src/app/helper/animations';

@Component({
  selector: 'osem-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  animations: [slideInOutMenu],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavRightComponent implements OnInit {

  @Output() themeToggled = new EventEmitter();
  @Output() languageToggled = new EventEmitter();
  @Output() settingsToggled = new EventEmitter();

  @Input() theme;
  @Input() language;
  @Input() settings;

  constructor() { }

  ngOnInit() {
  }

  toggleTheme(them){
    if(them === "light") {
      this.themeToggled.emit('dark');
    } else {
      this.themeToggled.emit('light');
    }
  }

  toggleLanguage(lang){
    if(lang === "de") {
      this.languageToggled.emit('en');
    } else {
      this.languageToggled.emit('de');
    }
  }

  toggleSettings(){
    this.settingsToggled.emit();
  }
}
