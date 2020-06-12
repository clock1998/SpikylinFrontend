import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './modules/home/pages/landing/landing.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { GalleryComponent } from './modules/gallery/pages/gallery/gallery.component';
import { YbdlComponent } from './modules/ybdl/pages/ybdl/ybdl.component';
import { LoginComponent } from './core/authentication/login/login.component';

const routes: Routes = [
	{ path: '', component: LandingComponent, data: { animation: 'Home' } },
	{ path: 'about', component: AboutComponent, data: { animation: 'About' } },
	{ path: 'gallery', component: GalleryComponent, data: { animation: 'Gallery' } },
	{ path: 'ytdl', component: YbdlComponent, data: { animation: 'Ytdl' } },
	{ path: 'login', component: LoginComponent, data: { animation: 'Ytdl' } },
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
