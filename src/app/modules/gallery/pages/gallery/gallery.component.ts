import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, animation } from '@angular/animations';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: [ './gallery.component.scss' ],
	animations: [
		trigger('lightBox', [
			state(
				'show',
				style({
					display: 'block'
				})
			)
		]),
		trigger('showImage', [
			state(
				'showImage',
				style({
					transform: 'scale(1)'
				})
			),
			transition('* <=> showImage', [ animate('0.5s') ])
		])
	]
})
export class GalleryComponent implements OnInit {
	images: Image[];
	constructor(private galleryService: GalleryService) {}
	isLightBoxShown: boolean = false;
	imageUrl: string = '';
	ngOnInit(): void {
		this.getImages();
	}

	getImages(): void {
		this.galleryService.getImages().subscribe((images) => {
			this.images = images;
		});
	}
	showLightBox(imageUrl: string): void {
		this.isLightBoxShown = true;
		this.imageUrl = imageUrl;
	}
	hideLightBox(): void {
		this.isLightBoxShown = false;
	}
}
