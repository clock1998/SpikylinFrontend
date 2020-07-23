import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
	DJANGO_SERVER = 'http://127.0.0.1:8000';
	images: Image[];
	isLightBoxShown: boolean = false;
	form: FormGroup;
	response;
	imageUrl: string = '';

	constructor(private formBuilder: FormBuilder, private galleryService: GalleryService) {}
	ngOnInit(): void {
		this.getImages();
		this.form = this.formBuilder.group({
			image:['']
		})
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

	onChange(event) {
		if (event.target.files.length > 0) {
		  const file = event.target.files[0];
		  this.form.get('image').setValue(file);
		}
	}

	onSubmit() {
		const formData = new FormData();
		formData.append('file', this.form.get('image').value);
	
		this.galleryService.uploadImage(formData).subscribe(
		  (res) => {
			this.response = res;
			this.imageUrl = `${this.DJANGO_SERVER}${res.file}/`;
			console.log(res);
			console.log(this.imageUrl);
		  },
		  (err) => {  
			console.log(err);
		  }
		);
	  }
}
