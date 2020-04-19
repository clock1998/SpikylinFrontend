import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './modules/home/pages/landing/landing.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { GalleryComponent } from './modules/gallery/pages/gallery/gallery.component';
import { YbdlComponent } from './modules/ybdl/pages/ybdl/ybdl.component';

const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'gallery', component: GalleryComponent },
	{ path: 'ytdl', component: YbdlComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
