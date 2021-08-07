import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-show-single-item',
  templateUrl: './show-single-item.component.html',
  styleUrls: ['./show-single-item.component.css']
})
export class ShowSingleItemComponent implements OnInit {

  singleItem: any = []
  imageToShow: any = ''

  // id: String = ''

  constructor(public _catService: CategoryService, private router: ActivatedRoute) { 
    this.getSingleItem()
    this.getCatName()
  }

  ngOnInit(): void {
  }

  // createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //   this.imageToShow = reader.result
  //   }, false);
    
  //   if (image) {
  //   reader.readAsDataURL(image);
  //   console.log(image)
  //   }
  //   } 

  getSingleItem() {
    let id = this.router.snapshot.paramMap.get('id')
    this._catService.showSingleItem(id).subscribe(
      res => {
        // this.id = res.success._id
        this.singleItem = res.success
        console.log(this.singleItem.data.itemImage)
        // this.createImageFromBlob(this.singleItem.itemImage)
      }
    )
  }

  getCatName() {
    this._catService.displayAllCats().subscribe(
      res => {
        this._catService.globalVar = res.success
      }
    )
  }

  
}
