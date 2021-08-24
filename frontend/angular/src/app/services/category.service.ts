import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Items } from '../interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public globalVar: any = []

  constructor(private _http: HttpClient) { }

  commonURL = 'http://localhost:3000/cat/'


  // Operation category
  addCatsForm(data: Category): Observable<any> {
    return this._http.post(`${this.commonURL}addCats`, data)
  }

  getImage(url: string): Observable<Blob> {
    return this._http.get(`${url}`, { responseType: 'blob' })
  }

  displayAllCats(): Observable<any> {
    return this._http.get(`${this.commonURL}displayCats`)
  }

  displaySingleCat(id: any): Observable<any> {
    return this._http.get(`${this.commonURL}showCat/${id}`)
  }

  editCats(id: any, data: any): Observable<any> {
    return this._http.patch(`${this.commonURL}editCats/${id}`, data)
  }

  delCats(id: any): Observable<any> {
    return this._http.delete(`${this.commonURL}deleteCat/${id}`)
  }

  // Operation items into category
  addItemsForm(data: FormData): Observable<any> {
    return this._http.post(`${this.commonURL}addItem`, data)
  }

  showAllItems(): Observable<any> {
    return this._http.get(`${this.commonURL}showAllItems`)
  }

  showSingleItem(path: any): Observable<any> {
    return this._http.get(`${this.commonURL}showImage/${path}`) // , { responseType: 'Blob' as 'json' }
  }

  editItem(id: any, data: any): Observable<any> {
    return this._http.patch(`${this.commonURL}editItem/${id}`, data)
  }

}
