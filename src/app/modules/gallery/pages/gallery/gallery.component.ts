import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: [ './gallery.component.scss' ],
	animations: [
		trigger('lightBox', [
			state(
				'show',
				style({
					display: 'flex'
				})
			),
			transition('* <=> show', [])
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
