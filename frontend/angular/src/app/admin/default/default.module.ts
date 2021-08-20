import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { PostsComponent } from '../modules/posts/posts.component';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FlexLayoutModule } from '@angular/flex-layout';


// Materials
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';


// Categories
import { ShowCategoryComponent } from '../show-category/show-category.component';
import { ShowSingleCatComponent } from '../show-single-cat/show-single-cat.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

// Items
import { ShowItemsComponent } from '../show-items/show-items.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { ShowSingleItemComponent } from '../show-single-item/show-single-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { ShowAllUsersComponent } from '../show-all-users/show-all-users.component';
import { ShowSingleUserComponent } from '../show-single-user/show-single-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    // Category components
    AddCategoryComponent,
    ShowCategoryComponent,
    ShowSingleCatComponent,
    EditCategoryComponent,

    // Item components
    AddItemComponent,
    ShowItemsComponent,
    ShowSingleItemComponent,
    EditItemComponent,

    // User components
    ShowAllUsersComponent,
    ShowSingleUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // Forms modules
    ReactiveFormsModule,

    FlexLayoutModule,
    // Materail modules
    MatSidenavModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatSortModule,

    BsDatepickerModule
  ]
})
export class DefaultModule { }
