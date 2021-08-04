import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-show-single-cat',
  templateUrl: './show-single-cat.component.html',
  styleUrls: ['./show-single-cat.component.css']
})
export class ShowSingleCatComponent implements OnInit {
  allItems: any = []
  cat: any = ''
  id = this.router.snapshot.paramMap.get('id')


  constructor(public _catService: CategoryService, private router: ActivatedRoute) {
    this.getAllItems()
  }

  ngOnInit(): void {
  }

  getAllItems() {
    this._catService.displaySingleCat(this.id).subscribe(res => {
      this.allItems = res.itemData
      this.cat = res.success
      console.log(this.cat)
      console.log(this.allItems)
    })
  }


}
