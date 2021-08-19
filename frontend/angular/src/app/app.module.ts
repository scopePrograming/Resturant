import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { UsersService } from './services/users.service';
// import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CategoryService } from './services/category.service';
// import { ShowCategoryComponent } from './admin/show-category/show-category.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shares/footer/footer.component';
import { NavbarComponent } from './shares/navbar/navbar.component';
import { HeaderComponent } from './shares/header/header.component';
import { UserInterceptor } from './interceptor/user.interceptor';
import { AddItemsComponent } from './admin/add-items/add-items.component';
import { ShowItemsComponent } from './admin/show-items/show-items.component';
// import { ShowSingleItemComponent } from './admin/show-single-item/show-single-item.component';
// import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { ShowSingleCatComponent } from './admin/show-single-cat/show-single-cat.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ShowAllUsersComponent } from './admin/show-all-users/show-all-users.component';
import { ShowSingleUserComponent } from './admin/show-single-user/show-single-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';

// Module default admin
import { DefaultModule } from './admin/default/default.module';
import { AdminModule } from './admin/admin.module';

// Material
import { MatButtonModule } from '@angular/material/button';

// Libs 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { ShowSingleItemComponent } from './admin/show-single-item/show-single-item.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddCategoryComponent,
    // ShowCategoryComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    AddItemsComponent,
    ShowItemsComponent,
    ShowSingleItemComponent,
    EditCategoryComponent,
    // ShowSingleCatComponent,
    EditItemComponent,
    AddItemComponent,
    ShowAllUsersComponent,
    ShowSingleUserComponent,
    EditUserComponent,
    AddAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    AdminModule,
    DefaultModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true
    },
    UsersService,
    CategoryService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
