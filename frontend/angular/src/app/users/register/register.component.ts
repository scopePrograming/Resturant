import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variables
  result: any  = {} // = {} ? = []?! // to inserted data as object
  msgCheck: any = null
  isSubmited: boolean = false
  flag: boolean = false
  // file: File = null

  userData = new FormGroup({ 
    // How to work min and max ???!!! 
    fname:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]), 
    lname:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]), 
    email:new FormControl('', [Validators.required, Validators.email]), 
    password:new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    userType:new FormControl('user'), 
    phone: new FormControl('',[Validators.required, Validators.pattern("^[0-9]+$")]),
    // address: new FormGroup({
    //   gov: new FormControl
    // }) 
    userImage: new FormControl(''),
    accountStatus: new FormControl(false),
    activateCode: new FormControl(''),
    
  }) 

  constructor(private _userService: UsersService , private _router:Router) { }

  ngOnInit(): void {}

  
  uploadImage(event:any){
    let file = event.target.files[0] 
    this.userData.get('userImage')?.setValue(file)
  }

  userRegisterForm(){
    let formData = new FormData()
    formData.append('fname', this.userData.get('fname')?.value)
    formData.append('lname', this.userData.get('lname')?.value)
    formData.append('email', this.userData.get('email')?.value)
    formData.append('password', this.userData.get('password')?.value)
    formData.append('phone', this.userData.get('phone')?.value)
    formData.append('userImage', this.userData.get('userImage')?.value)

    // let userInfo: Users = this.userData.value

    this.isSubmited = true

    if (this.userData.valid) {
      
      this._userService.userRegister(formData).subscribe(
        res => { this.result = res },
    
        (e) => { 
          this.flag = false
          this.msgCheck = e.error.message 
        },

        () => {
          if(this.result?.success != "") { 
            this.flag = true
            this.msgCheck = this.result.message
            this.userData.reset()
            this.isSubmited = false 
            this._router.navigate(['/users/login'])
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
