import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Variables
  result: any = {}
  msgCheck: any = null
  // loginRes:any = null
  isSubmited: boolean = false
  flag: boolean = false

  userData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),

  })

  constructor(public _userService: UsersService, private _router: Router) { }

  ngOnInit(): void { }

  userLoginForm() {
    let userInfo: Users = this.userData.value
    this.isSubmited = true
    if (this.userData.valid) {
      this._userService.userLogin(userInfo).subscribe(
        res => { this.result = res },

        (e) => {
          this.flag = false
          this.msgCheck = e.error.message
        },

        () => {

          // if (this.result.error) this.msgCheck = `error login`
          if (this.result?.success != "") {
            this.flag = true
            this.msgCheck = this.result.message
            this.userData.reset()
            this.isSubmited = false

            let token = this.result.success.token
            localStorage.setItem('token', token)
            let typeUser = this.result.success.user.userType

            typeUser == 'user' ?
              this._router.navigate(['/']) :
              this._router.navigate(['/category/addCat'])
            console.log(typeUser)
          }
        }

      )
    }
  }

  get password() {
    return this.userData.get('password')
  }

  get email() {
    return this.userData.get('email')
  }

}
