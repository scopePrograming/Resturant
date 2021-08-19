import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { PostsComponent } from '../modules/posts/posts.component';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


import { ShowCategoryComponent } from '../show-category/show-category.component';
import { ShowSingleCatComponent } from '../show-single-cat/show-single-cat.component';
// import { EditCategoryComponent } from '../edit-category/edit-category.component';
// import { AddCategoryComponent } from '../add-category/add-category.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

 

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    // Category components
    ShowCategoryComponent,
    // EditCategoryComponent,
    // AddCategoryComponent
    ShowSingleCatComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,

    BsDatepickerModule
  ]
})
export class DefaultModule { }
