import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Items } from 'src/app/interfaces/items';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'] 
  
})
export class AddItemsComponent implements OnInit {
  
  category: any = []
  isSubmited: Boolean = false
  msgCheck: String = ''
  result: any = {}
  checkBox: Boolean = false

  size: any = [
    {sizeType: "none", val: 'none'},
    {sizeType: "large", val: 'large'},
    {sizeType: "meduim", val: 'meduim'},
    {sizeType: "small", val: 'small'}
  ]
  
  isOffer: Boolean = false

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
      is_offer: new FormControl(),
      newPrice: new FormControl('',[Validators.pattern("^[0-9]+$")]),
      desc: new FormControl('', [Validators.maxLength(200)])
    })
    
  })

  constructor(private _catService: CategoryService, private fd: FormBuilder) { 
    this.catNames()
  }

  ngOnInit(): void {
  }

  uploadImage(event : any) {
    let file = event.target.files[0]
    this.itemData.get('itemImage')?.setValue(file)
    console.log(this.itemData.get('itemImage')?.setValue(file)) // undefined
    console.log(file)
  }
  

  addItem() {
    // let itemInfo : Items = this.itemData.value
    let itemInfo = new FormData()
    itemInfo.append('cat_id', this.itemData.get('cat_id')?.value)
    itemInfo.append('name', this.itemData.get('name')?.value)
    itemInfo.append('description', this.itemData.get('description')?.value)
    itemInfo.append('DateFrom', this.itemData.get('DateFrom')?.value)
    itemInfo.append('DateTo', this.itemData.get('DateTo')?.value)

    itemInfo.append('size.0.sizeType', this.itemData.get('size')?.get('sizeType')?.value)
    itemInfo.append('size.0.price', this.itemData.get('size')?.get('price')?.value)

    itemInfo.append('offer_item.0.is_offer', this.itemData.get('offer_item')?.get('is_offer')?.value)
    itemInfo.append('offer_item.0.newPrice', this.itemData.get('offer_item')?.get('newPrice')?.value)
    itemInfo.append('offer_item.0.desc', this.itemData.get('offer_item')?.get('desc')?.value)



    itemInfo.append('itemImage', this.itemData.get('itemImage')?.value)
    this.isSubmited = true
   
    if(this.itemData.valid) {
      this._catService.addItemsForm(itemInfo).subscribe( 
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

  catNames() {
    this._catService.displayAllCats().subscribe(res => {
      //console.log(res.success)
      this.category = res.success
      // console.log(this.category.success.success[0].catName)
    })
  }

  // explan
  selectSize(event : any) {
    
    this.size.setValue(event.target.value, {
      onlySelf: true,
      
    })
    
  }

  offerStatus(event : any) {
    // if(event.target.value == 'on') event.target.value = ''
    // this.itemData.get('offer_item')?.get('is_offer')?.setValue(event.target.value)
    this.checkBox = true
    console.log(event.target,  this.checkBox)
  }

  // changeCity(e) {
  //   this.cityName.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }
  // offerItemsStatus() {
  //   this._catService.showAllItems().subscribe(res => {
  //     //console.log(res.success)
  //     this.offer = res.success
  //     this.offer.forEach((el:any)=> {
  //       el.offer_item.forEach((e:any) => {
  //         console.log(e.is_offer)
  //       })
  //     })
  //     //console.log(this.offer)
  //   })
  // }

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

  get is_offer() {
    return this.itemData.get('offer_item')?.get('is_offer')
  }

  get newPrice() {
    return this.itemData.get('offer_item')?.get('newPrice')
  }

  get desc() {
    return this.itemData.get('offer_item')?.get('desc')
  }

  get itemImage () {
    return this.itemData.get('itemImage')
  }
  
  
}

