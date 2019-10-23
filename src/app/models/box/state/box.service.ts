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

  add(box: Box) {
    this.boxStore.add(box);
  }

  update(id, box: Partial<Box>) {
    this.boxStore.update(id, box);
  }

  remove(id: ID) {
    this.boxStore.remove(id);
  }
}
