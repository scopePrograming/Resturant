import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { UsersService } from './services/users.service';
import { CategoryService } from './services/category.service';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shares/footer/footer.component';
import { NavbarComponent } from './shares/navbar/navbar.component';
import { HeaderComponent } from './shares/header/header.component';
import { UserInterceptor } from './interceptor/user.interceptor';
import { AddItemsComponent } from './admin/add-items/add-items.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AddAdminComponent } from './admin/add-admin/add-admin.component';

// Module default admin
import { DefaultModule } from './admin/default/default.module';
import { AdminModule } from './admin/admin.module';

// Material
import { MatButtonModule } from '@angular/material/button';

// Libs 
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    HeaderComponent,
    AddItemsComponent, // Testing
    
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
