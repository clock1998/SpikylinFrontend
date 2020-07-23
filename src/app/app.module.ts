import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './modules/home/pages/landing/landing.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AboutComponent } from './modules/about/pages/about/about.component';
import { GalleryComponent } from './modules/gallery/pages/gallery/gallery.component';
import { YbdlComponent } from './modules/ybdl/pages/ybdl/ybdl.component';
import { ImageComponent } from './modules/gallery/components/image/image.component';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginComponent } from './core/authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [
		AppComponent,
		LandingComponent,
		NavbarComponent,
		FooterComponent,
		AboutComponent,
		GalleryComponent,
		YbdlComponent,
		ImageComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		MatProgressBarModule,
		ReactiveFormsModule
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
