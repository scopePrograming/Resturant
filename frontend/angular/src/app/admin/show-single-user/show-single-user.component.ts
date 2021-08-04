import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-show-single-user',
  templateUrl: './show-single-user.component.html',
  styleUrls: ['./show-single-user.component.css']
})
export class ShowSingleUserComponent implements OnInit {
  singleUser: any = []
  result: any = {}
  msgCheck: any = null
  id = this.router.snapshot.paramMap.get('id')

  constructor(public _userService: UsersService, private router: ActivatedRoute, private _router: Router) {
    this.getSingleUser()
  }

  ngOnInit(): void {
  }

  getSingleUser() {
    this._userService.showSingleUser(this.id).subscribe(res => {
      this.result = res
      this.singleUser = this.result.success
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  deleteUser() {
    this._userService.deleteUser().subscribe(res => {

    },
      () => { },
      () => {
        localStorage.removeItem('token')
        this._userService.status = true
        this._router.navigate(['/'])
      })
  }

}
