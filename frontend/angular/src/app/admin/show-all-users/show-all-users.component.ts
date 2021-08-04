import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {
  allUsers: any = []
  result: any = {}
  msgCheck: any = null

  constructor(private _userService: UsersService, private _router: Router) {
    this.getAllUsers()
  }

  ngOnInit(): void {
  }

  getAllUsers() {
    this._userService.showAllUsers().subscribe(res => {
      this.result = res
      this.allUsers = this.result.success
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  deleteByAdmin(id: any) {
    this._userService.deleteUserByAdmin(id).subscribe(res => { },
      () => { },
      () => {
        this._router.navigate(['/showallusers'])
      })
  }
}
