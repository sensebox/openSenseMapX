import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhenomenaService {

  constructor(private http:HttpClient) { }

  /**
   * Get all phenomena
   */
  getPhenomena () {
    return this.http.get('https://api.sensor-wiki.opensensemap.org/phenomena/all?type=json');
    }
  }

