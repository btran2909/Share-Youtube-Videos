import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { VideosComponent } from './videos/videos.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
    { path: '', component: VideosComponent },
    { path: 'login', component: NavbarComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'share', component: VideosComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
