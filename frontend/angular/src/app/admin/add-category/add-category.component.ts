import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  // Variables
  private result: any  = {}
  msgCheck: String = ''
  isSubmited: boolean = false

  catData = new FormGroup({ 

    catName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]), 
  
  })

  constructor(private _catService: CategoryService) { }
  ngOnInit(): void {}

  addCats() {
    let catInfo: Category = this.catData.value
    this.isSubmited = true
    if (this.catData.valid) {
      this._catService.addCatsForm(catInfo).subscribe(
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
