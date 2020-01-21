import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { VideosComponent } from './videos/videos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DialogShareVideo } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  entryComponents: [DialogShareVideo],
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserDetailComponent,
    VideosComponent,
    NavbarComponent,
    DialogShareVideo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
