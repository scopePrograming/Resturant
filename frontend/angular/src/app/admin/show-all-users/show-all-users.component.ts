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
  singleUser: any = []
  msgCheck: any = null
  id = this.router.snapshot.paramMap.get('id')
  constructor(private _userService: UsersService, private router: ActivatedRoute, private _router: Router) {
    this.getAllUsers()
  }

  ngOnInit(): void {
  }

  getAllUsers() {
    this._userService.showAllUsers().subscribe(res => {
      this.result = res
      this.allUsers = this.result.success
      console.log(res)
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  deleteUserByAdmin(i: Required<number>) {
    this._userService.deleteUserByAdmin(this.id).subscribe(res => {
      console.log(res)
      this.singleUser = res.success
    },
      () => { },
      () => {
        this.singleUser.removeAt(i)
        this._router.navigate(['/showallusers'])
      })
  }
}
