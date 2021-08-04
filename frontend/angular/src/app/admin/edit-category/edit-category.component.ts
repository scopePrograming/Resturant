import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  result: any = {}
  allCtas: any = []
  msgCheck: string = ''
  isSubmited: boolean = false
  id = this.router.snapshot.paramMap.get('id')


  catData = new FormGroup({ 
    catName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]), 
  })


  constructor(public _catService: CategoryService, private router: ActivatedRoute, private _router: Router) { 
    this.getOldCatName()
  }

  ngOnInit(): void {
  }

  

  getOldCatName() {
    // let id = this.router.snapshot.paramMap.get('id')
    this._catService.displayAllCats().subscribe(
      res => {
        this._catService.globalVar = res.success
        this._catService.globalVar.forEach((ele: any) => {
          if (this.id == ele._id) this.catData.get('catName')?.setValue(`${ele.catName}`)
        })
      }
    )
  }

  editFormCats() {
    // let id = this.router.snapshot.paramMap.get('id')
    let catInfo: Category = this.catData.value
    this.isSubmited = true
    if (this.catData.valid) {
      this._catService.editCats(this.id, catInfo).subscribe(
        res => {
          this.result = res
        },
    
        () => {
          this.msgCheck = `Error`
        },

        () => {
          if(this.result?.catData != "") { 
            this.msgCheck= "done"
            this.catData.reset()
            this.isSubmited = false 
            this._router.navigate(['/category/displayCats'])
          } 

          else {
            this.msgCheck = "error" 
          }
        
        }
    
      )
    }
  }


  get catName() {
    return this.catData.get('catName')
  }

  

}
