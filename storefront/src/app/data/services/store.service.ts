import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { StoreForm } from '../models/storeform';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  BASE_URL = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { 


    
  }
  getStoreName(): Observable<Store []> {
    return this.http.get<Store []>(this.BASE_URL)
      
  }
  postStoreInformation(data: StoreForm): Observable<any> {
    console.log(data)
    return this.http.post(this.BASE_URL + '/form', data)
  }
}
