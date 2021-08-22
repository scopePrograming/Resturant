import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public status: boolean = false
  private commonURL = `http://localhost:3000/user/`
  constructor(private _http: HttpClient) { }

  userRegister(formData: FormData): Observable<any> {
    return this._http.post(`${this.commonURL}register`, formData)
  }

  userLogin(userData: Users): Observable<any> {
    return this._http.post(`${this.commonURL}login`, userData)
  }

  userLogout(): Observable<any> {
    return this._http.post(`${this.commonURL}logout`, null)
  }

  userLogoutAll(): Observable<any> {
    return this._http.post(`${this.commonURL}logoutAll`, null)
  }


  showAllUsers(): Observable<any> {
    return this._http.post(`${this.commonURL}all`, null)
  }

  showSingleUser(id: any): Observable<any> {
    return this._http.get(`${this.commonURL}single/${id}`)
  }

  editUser(id: any, data: any): Observable<any> {
    return this._http.patch(`${this.commonURL}edit/${id}`, data)
  }

  deleteUser(): Observable<any> {
    return this._http.delete(`${this.commonURL}delete`)
  }

  deleteUserByAdmin(id: any): Observable<any> {
    return this._http.delete(`${this.commonURL}delUser/${id}`)
  }

  upLoaded(): Observable<any> {
    return this._http.get(`https://jsonplaceholder.typicode.com/photos/5`)
  }

}
