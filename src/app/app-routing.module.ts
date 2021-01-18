import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './modules/home/landing/landing.component';
import { AboutComponent } from './modules/about/about/about.component';
import { GalleryComponent } from './modules/gallery/gallery/gallery.component';
import { YbdlComponent } from './modules/ybdl/ybdl/ybdl.component';
import { LoginComponent } from './modules/login/login/login.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { BlogComponent } from './modules/blog/blog/blog.component';
import { PostDetailComponent } from './modules/blog/post-detail/post-detail.component';
import { PostNewComponent } from './modules/blog/post-new/post-new.component';

const routes: Routes = [
	{ path: '', component: LandingComponent, data: { animation: 'Home' } },
	{ path: 'about', component: AboutComponent, data: { animation: 'About' } },
	{ path: 'gallery', component: GalleryComponent, data: { animation: 'Gallery' } },
	{ path: 'blog', component: BlogComponent, data: { animation: 'Gallery' } },
	{ path: 'post/:id', component:PostDetailComponent },
	{ path: 'ytdl', component: YbdlComponent, data: { animation: 'Ytdl' } },
	{ path: 'login', component: LoginComponent, data: { animation: 'Ytdl' } },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard], data: { animation: 'Ytdl' } },
    { path: 'newPost', component: PostNewComponent,canActivate:[AuthGuard],},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
