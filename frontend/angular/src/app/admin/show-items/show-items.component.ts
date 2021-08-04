import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.css']
})
export class ShowItemsComponent implements OnInit {
  allItems: any = []
  constructor(public _catService: CategoryService) { 
    this.getAllItems()
    this.getCatName()
  }

  ngOnInit(): void {
  }

  getAllItems(){
    this._catService.showAllItems().subscribe(res => {
      this.allItems = res.success
      //console.log(this.allItems[0].offer_item[0].is_offer)
    })
  }

  getCatName() {
    this._catService.displayAllCats().subscribe(
      res => {
        // this.allCats = res /// why ???? res.cats not working
        this._catService.globalVar = res.success
      }
    )
  }

}
