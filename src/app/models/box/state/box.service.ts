import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { BoxStore } from './box.store';
import { Box } from './box.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BoxService {

  constructor(private boxStore: BoxStore,
              private http: HttpClient) {
  }

  get() {
    return this.http.get<Box[]>('https://api.opensensemap.org/boxes?classify=true&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587').pipe(tap(entities => {
      this.boxStore.set(entities);
    }));
  }

  // getValue(pheno) {
  //   return this.http.get<any[]>(`https://api.opensensemap.org/boxes/data?&phenomenon=${pheno}&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&format=json&columns=boxId`).pipe(tap(entities => {
  //     entities = entities.map(ent => {
  //       return {
  //         _id: ent.boxId,
  //         [pheno]: ent.value
  //       }
  //     })
  //     console.log(entities);
  //     this.boxStore.upsertMany(entities);
  //   })); 
  // }
  getValue(pheno) {
    return this.http.get<any[]>(`https://api.opensensemap.org/statistics/descriptive?&phenomenon=${pheno}&bbox=13.0882097323,52.3418234221,13.7606105539,52.6697240587&format=json&columns=boxId&from-date=2019-10-23T14:00:00Z&to-date=2019-10-23T15:00:00Z&window=3600000&operation=arithmeticMean`).pipe(tap(entities => {
      entities = entities.map(ent => {
        const { boxId, sensorId, ...noEnt} = ent;
        return {
          _id: ent.boxId,
          values: {
            [pheno]: noEnt 
          } 
        }
      })
      console.log(entities);
      this.boxStore.upsertMany(entities);
    })); 
  }

  getSingleBox(id){
    return this.http.get<Box>(`https://api.opensensemap.org/boxes/${id}`).pipe(tap(entity => {
      this.boxStore.upsert(entity._id, entity);
    }));
  }

  add(box: Box) {
    this.boxStore.add(box);
  }

  setActive(id) {
    this.boxStore.setActive(id);
  }

  update(id, box: Partial<Box>) {
    this.boxStore.update(id, box);
  }

  remove(id: ID) {
    this.boxStore.remove(id);
  }
}
