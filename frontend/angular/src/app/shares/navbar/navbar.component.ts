import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  checkStatus = localStorage.getItem('status')


  constructor(public _userService: UsersService, private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._userService.userLogout().subscribe(res => { },
      () => { },
      () => {
        localStorage.removeItem('token')
        localStorage.setItem('status', '0')
        this._router.navigate(['/'])
          .then(() => {
            window.location.reload();
          })
      })
  }

  logoutAll() {
    this._userService.userLogoutAll().subscribe(res => { },
      () => { },
      () => {
        localStorage.removeItem('token')
        localStorage.setItem('status', '0')
        this._router.navigate(['/'])
      })
  }

}
