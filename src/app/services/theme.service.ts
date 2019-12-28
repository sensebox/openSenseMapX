import { Injectable } from '@angular/core';
import { MapService } from '../modules/explore/services/map.service';
import { UiQuery } from '../models/ui/state/ui.query';

interface Theme {
  name: string;
  properties: any;
}

const light: Theme = {
  name: "light",
  properties: {
    "--text-color-primary": "#383838",
    "--text-color-secondary": "#eee",
    
    "--color-primary": "#4EAF47",
    
    "--background-primary": "rgba(255, 255, 255, 0.7)",
    "--background-primary-light": "rgba(255, 255, 255, 0.1)",
    "--background-primary-full": "rgba(255,255,255,1)",
    
    "--background-secondary": "#4EAF47",
    "--background-secondary-light": "#68C961",
    
    "--color-opposite-light": "rgba(200, 200, 200)",
    
    "--box-shadow-basic": "1px 1px 2px 1px rgba(50,50,50,0.3)",
    "--shadow-color": "rgba(50,50,50,0.3)",
    
    "--color-disabled": "rgba(200,200,200)" 
    
    
  }
};

const dark: Theme = {
  name: "dark",
  properties: {
    "--text-color-primary": "#D3d3D3",
    "--text-color-secondary": "#eee",

    "--color-primary": "#4EAF47",
    
    "--background-primary": "rgba(56, 56, 56, 0.9)",
    "--background-primary-light": "rgba(56, 56, 56, 0.1)",
    "--background-primary-full": "rgba(56,56,56,1)",
    
    "--background-secondary": "#4EAF47",
    "--background-secondary-light": "#68C961",

    "--color-opposite-light": "rgba(80, 80, 80)",
    
    "--box-shadow-basic": "1px 1px 2px 1px rgba(220,220,220,0.3)",
    "--shadow-color": "rgba(0,0,0,0.3)",

    "--color-disabled": "rgb(45,45,45)"
  }
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme$ = this.uiQuery.selectTheme$;
  constructor(private mapService: MapService, private uiQuery: UiQuery) {
    this.theme$.subscribe(theme => {
      if(theme != this.active.name){
        this.toggleTheme();
      }
    })
  }


  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }
  toggleTheme(){
    if(this.isDarkTheme()){
      this.setActiveTheme(light);
      this.mapService.setThemeLight();
    } else {
      this.setActiveTheme(dark);
      this.mapService.setThemeDark();
    }
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}


