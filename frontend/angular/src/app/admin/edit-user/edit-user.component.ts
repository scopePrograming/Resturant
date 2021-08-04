import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  singleUser: any = []
  isSubmited: Boolean = false
  msgCheck: String = ''
  flag: boolean = true
  result: any = {}
  id = this.router.snapshot.paramMap.get('id')
  userData = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
    userImage: new FormControl('')
  })
  constructor(private _userService: UsersService, private router: ActivatedRoute, private _router: Router) {
    this.getOldData()
  }

  ngOnInit(): void {
  }

  uploadImage(event: any) {
    let file = event.target.files[0]
    this.userData.get('userImage')?.setValue(file)
  }

  getOldData() {
    this._userService.showSingleUser(this.id).subscribe(res => {
      this.singleUser = res.success
      let editUser = ['fname', 'lname', 'email', 'userImage', 'phone']
      editUser.forEach((user: any) => {
        this.userData.get(user)?.setValue(this.singleUser[user])
      })
    })
  }

  editUser() {
    let formData = new FormData()
    let editUser = ['fname', 'lname', 'email', 'userImage', 'phone']
    editUser.forEach(user => {
      formData.append(user, this.userData.get(user)?.value)
    })
    this.isSubmited = true
    if (this.userData.valid) {
      this._userService.editUser(this.id, formData).subscribe(
        res => {
          this.result = res
        },
        (e) => {
          this.flag = false
          this.msgCheck = e.error.message
        },
        () => {
          if (this.result?.success != "") {
            this.flag = true
            this.msgCheck = this.result.message
            this.userData.reset()
            this.isSubmited = false
            this._router.navigate(['/showallusers'])
          }
        }

      )
    }
  }

  get fname() {
    return this.userData.get('fname')
  }

  get lname() {
    return this.userData.get('lname')
  }

  get password() {
    return this.userData.get('password')
  }

  get email() {
    return this.userData.get('email')
  }

  get phone() {
    return this.userData.get('phone')
  }

}
