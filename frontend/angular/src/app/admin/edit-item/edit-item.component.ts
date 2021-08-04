import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

category: any = []
isSubmited: Boolean = false
msgCheck: String = ''
result: any = {}
id = this.router.snapshot.paramMap.get('id')

size: any = [
  {sizeType: "none", val: 'none'},
  {sizeType: "large", val: 'large'},
  {sizeType: "meduim", val: 'meduim'},
  {sizeType: "small", val: 'small'}
] 

itemData = new FormGroup({ 
  cat_id: new FormControl('',[Validators.required]),
  name: new FormControl('',[Validators.required , Validators.minLength(3) , Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]),
  description: new FormControl('', [Validators.maxLength(200)]),
  itemImage: new FormControl(),
  size: new FormGroup({
    sizeType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")])
  }),

  DateFrom: new FormControl(''),
  DateTo: new FormControl(''),
  
  offer_item: new FormGroup({
    is_offer: new FormControl(false),
    newPrice: new FormControl('',[Validators.pattern("^[0-9]+$")]),
    desc: new FormControl('', [Validators.maxLength(200)])
  }) 
  
}) 

constructor(public _catService: CategoryService, private router: ActivatedRoute) { 
  this.getOldDataItem()
}

ngOnInit(): void {
}

// Function to uploaded image //- Check
uploadImage(event : any) {
  let file = event.target.files[0]
  this.itemData.get('itemImage')?.setValue(file)
}

// Function to selected size
selectSize(event : any) {
  this.size.setValue(event.target.value, {
    onlySelf: true,
  })
}

// Show all category to used in items
catNames() {
  this._catService.displayAllCats().subscribe(res => {
    this.category = res.success
    return this.category
  })
}

// Store and show old data before update
getOldDataItem () {
  this.catNames()
  this._catService.showSingleItem(this.id).subscribe(
    res => {
      this._catService.globalVar = res.success

      this.category.forEach((ele: any ) => {
        if(ele._id == this._catService.globalVar.cat_id) {
          this.itemData.get('cat_id')?.setValue(`${ele._id}`)
          console.log(`${ele.catName}`)
        }

      })

      this.itemData.get('name')?.setValue(`${this._catService.globalVar.name}`)
      this.itemData.get('description')?.setValue(`${this._catService.globalVar.description}`)

      this.itemData.get('DateFrom')?.setValue(`${this._catService.globalVar.DateFrom} | date`) 
      this.itemData.get('DateTo')?.setValue(`${this._catService.globalVar.DateTo}`)
      
      this._catService.globalVar.size.forEach((ele : any) => {
        this.itemData.get('size')?.get('sizeType')?.setValue(`${ele.sizeType}`)
        this.itemData.get('size')?.get('price')?.setValue(`${ele.price}`)
      })

      this._catService.globalVar.offer_item.forEach((ele : any) => {
        this.itemData.get('offer_item')?.get('is_offer')?.setValue(`${ele.is_offer}`)
        this.itemData.get('offer_item')?.get('newPrice')?.setValue(`${ele.newPrice}`)
        this.itemData.get('offer_item')?.get('desc')?.setValue(`${ele.desc}`)
      })

      

    }
  )
}

editItem() {
  let itemInfo = new FormData()
  itemInfo.append('cat_id', this.itemData.get('cat_id')?.value)
  itemInfo.append('name', this.itemData.get('name')?.value)
  itemInfo.append('description', this.itemData.get('description')?.value)
  itemInfo.append('DateFrom', this.itemData.get('DateFrom')?.value)
  itemInfo.append('DateTo', this.itemData.get('DateTo')?.value)

  itemInfo.append('itemImage', this.itemData.get('itemImage')?.value)
  this.isSubmited = true
 
  if(this.itemData.valid) {
    this._catService.editItem(this.id, itemInfo).subscribe( 
      res => {
      this.result = res
      
    },
    
      () => { },
      () => {
        if(this.result?.itemData != "") { 
          this.msgCheck= "done"
          this.itemData.reset()
          this.isSubmited = false 
          
        } 

        else {
          this.msgCheck = "error" 
          
        }
      }
    )
    
  }
  
}


get cat_id() {
  return this.itemData.get('cat_id')
}
get name() {
  return this.itemData.get('name')
}
get description() {
  return this.itemData.get('description')
}
get DateFrom() {
  return this.itemData.get('DateFrom')
}
get DateTo() {
  return this.itemData.get('DateTo')
}

get sizeType() {
  return this.itemData.get('size')?.get('sizeType')
}

get price() {
  return this.itemData.get('size')?.get('price')
}

get offer_item_offer() {
  return this.itemData.get('offer_item')?.get('is_offer')
}

get offer_item_price() {
  return this.itemData.get('offer_item')?.get('newPrice')
}

get offer_item_desc() {
  return this.itemData.get('offer_item')?.get('desc')
}

get itemImage () {
  return this.itemData.get('itemImage')
}


}
