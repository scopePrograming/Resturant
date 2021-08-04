import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {

  category: any = []
  isSubmited: Boolean = false
  stausOffer: Boolean = true
  textBtn : String = `Show Offer`

  descriptionStatus: Boolean = true
  textBtnDesc: String = `Add Description`
  
  msgCheck: String = ''
  result: any = {}

  sizeData: any = [
    {sizeType: "none", val: 'none'},
    {sizeType: "large", val: 'large'},
    {sizeType: "meduim", val: 'meduim'},
    {sizeType: "small", val: 'small'}
  ]

  constructor(private _catService: CategoryService, private fb: FormBuilder) {
    this.catNames()
  }

  itemData : FormGroup = this.fb.group({
    cat_id: ['',[Validators.required]],
    name: ['',[Validators.required , Validators.minLength(3) , Validators.maxLength(20), Validators.pattern("^[a-zA-Z ]*")]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    dateRange: [''],
    itemImage: ['', [Validators.required]],
    size: this.fb.array([
      this.storeSize()
    ]),
    offer_item: this.fb.array([
      // this.storeOffers()
    ])
  })

  storeOffers() {
    return this.fb.group({
      newPrice: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      desc: ['', [Validators.required, Validators.maxLength(200)]],
      dateRangeOffer: ['', [Validators.required]]
      // newPrice: ['', [Validators.pattern("^[0-9]+$")]],
      // desc: ['', [Validators.maxLength(200)]]
    })
  }

  addOfferOnItem() {
    this.offer_item.push(this.storeOffers())
  }

  selectSize(event : any) {
    this.sizeData.setValue(event.target.value, {
      onlySelf: true,
    })
  }

  storeSize() {
    return this.fb.group ({
      sizeType: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    })
  }

  addSizeItem() {
    this.size.push(this.storeSize())
  }

  addDescription(even: any) {
    console.log(this.description)
    this.descriptionStatus = !this.descriptionStatus
    even.target.textContent == this.textBtnDesc ? 
    even.target.textContent = 'Hidden Description' : 
    even.target.textContent = this.textBtnDesc
  }

  ngOnInit(): void {}

  catNames() {
    this._catService.displayAllCats().subscribe(res => {
      this.category = res.success
    })
  }

  uploadImage(event : any) {
    let file = event.target.files[0]
    this.itemData.get('itemImage')?.setValue(file)
    // console.log(this.itemData.get('itemImage')?.value.name.setValue(null)) // undefined
    console.log(file.name)
  }

  
  changeStatusOffer(even : any) {
    this.stausOffer = !this.stausOffer
    even.target.textContent == this.textBtn ? 
    even.target.textContent = 'Hidden Offer' : 
    even.target.textContent = this.textBtn
  }

  removeOffer(i : Required<number>) {
    this.offer_item.removeAt(i)
  }

  removeSize(i : Required<number>) {
    this.size.removeAt(i)
  }

  reset() {
    this.itemData.get('itemImage')?.value.name.setValue(null)
    
  }

  addItem() {
    // this.itemData.value
    this.isSubmited = true
    let itemInfo = new FormData()
    let valSize: any = this.itemData.get('size')?.value as FormArray
    let vals: any = this.itemData.get('offer_item')?.value as FormArray

    itemInfo.append('cat_id', this.itemData.get('cat_id')?.value)
    itemInfo.append('name', this.itemData.get('name')?.value)
    itemInfo.append('description', this.itemData.get('description')?.value)
    itemInfo.append('dateRange', this.itemData.get('dateRange')?.value)

    itemInfo.append('itemImage', this.itemData.get('itemImage')?.value)

    
      vals.forEach((ele: any, i : Number) => {
        // if(ele.newPrice != '' && ele.desc != '') {
          
          for (let j in ele) {
            itemInfo.append(`offer_item.${i}.${j}`, ele[j])
          }
        // }
      })
   
    

    valSize.forEach((ele: any, i : Number) => {
      for (let j in ele) {
        itemInfo.append(`size.${i}.${j}`, ele[j])
      }
    })

    if(this.itemData.valid) {
      this._catService.addItemsForm(itemInfo).subscribe(
        res => {
          console.log(res.success)
        },
        () => {},
        () => {
          if(this.result?.itemData != "") { 
            this.msgCheck= "done"
            this.itemData.get('itemImage')?.setValue(null)
            this.itemData.reset()
            this.isSubmited = false 
            
          } 
          else this.msgCheck = "error" 
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

  get dateRange () {
    return this.itemData.get('dateRange')
  }

  get itemImage () {
    return this.itemData.get('itemImage')
  }

  get size() : FormArray {
    return this.itemData.get('size') as FormArray
  }

  // get newPrice() {
  //   return this.itemData.get('offer_item')?.get('newPrice')
  // }

  get offer_item() : FormArray {
    return this.itemData.get('offer_item') as FormArray
  }

}
