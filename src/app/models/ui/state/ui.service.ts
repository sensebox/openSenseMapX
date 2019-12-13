import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { UiStore } from './ui.store';
import { Ui } from './ui.model';
import { tap } from 'rxjs/operators';
import { ColorHelper } from '@swimlane/ngx-charts';

@Injectable({ providedIn: 'root' })
export class UiService {

  constructor(private uiStore: UiStore) {
  }

  update(ui: Partial<Ui>) {
    this.uiStore.update(ui);
  }

  updateColors(colors: ColorHelper){
    this.uiStore.update({colors: colors});
  }

  setActiveSensorTypes(types){
    this.uiStore.setActiveSensorTypes(types);
  }

  updateSelectedPheno(pheno) {
    this.uiStore.updateSelectedPheno(pheno);
  }

  setLayers(layers){
    this.uiStore.setLayers(layers);
  }

}
