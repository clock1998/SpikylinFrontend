import { Component, OnInit } from '@angular/core';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: [ './gallery.component.scss' ]
})
export class GalleryComponent implements OnInit {
	images: Image[];
	constructor(private galleryService: GalleryService) {}

	ngOnInit(): void {
		this.galleryService.getImages().subscribe((images) => {
			this.images = images;
		});
	}
}
