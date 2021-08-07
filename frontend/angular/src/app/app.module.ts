import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { UsersService } from './services/users.service';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { CategoryService } from './services/category.service';
import { ShowCategoryComponent } from './admin/show-category/show-category.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shares/footer/footer.component';
import { NavbarComponent } from './shares/navbar/navbar.component';
import { HeaderComponent } from './shares/header/header.component';
import { UserInterceptor } from './interceptor/user.interceptor';
import { AddItemsComponent } from './admin/add-items/add-items.component';
import { ShowItemsComponent } from './admin/show-items/show-items.component';
import { ShowSingleItemComponent } from './admin/show-single-item/show-single-item.component';
import { EditCategoryComponent } from './admin/edit-category/edit-category.component';
import { ShowSingleCatComponent } from './admin/show-single-cat/show-single-cat.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SidebarComponent } from './admin/shares/sidebar/sidebar.component';
import { ShowAllUsersComponent } from './admin/show-all-users/show-all-users.component';
import { ShowSingleUserComponent } from './admin/show-single-user/show-single-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminFooterComponent } from './admin/shares/admin-footer/admin-footer.component';
import { AdminNavbarComponent } from './admin/shares/admin-navbar/admin-navbar.component';
import { AdminHeaderComponent } from './admin/shares/admin-header/admin-header.component';

// import { ActivatedRoute } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddCategoryComponent,
    ShowCategoryComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    AddItemsComponent,
    ShowItemsComponent,
    ShowSingleItemComponent,
    EditCategoryComponent,
    ShowSingleCatComponent,
    EditItemComponent,
    AddItemComponent,
    SidebarComponent,
    ShowAllUsersComponent,
    ShowSingleUserComponent,
    EditUserComponent,
    AdminLoginComponent,
    AddAdminComponent,
    AdminHomeComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminHeaderComponent,
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
