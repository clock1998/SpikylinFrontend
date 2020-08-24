import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';
import { flatMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

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
	isLightBoxShown: boolean = false;
    imageUrl: string = '';
    showEditButton:boolean = false;
    isEditMode:boolean = false;
    uploadImageForm: FormGroup;
    response: any;

    constructor( private galleryService: GalleryService,
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService) {}
	ngOnInit(): void {
        this.getImages();
        this.showEditButton = this.authentication.isLoggedIn;
        this.uploadImageForm = this.formBuilder.group({
            image: ['']
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
            this.uploadImageForm.get('image').setValue(file);
        }
    }
    onImageSubmit() {
        const formData = new FormData();

        formData.append('file', this.uploadImageForm.get('image').value);
        formData.append('name', this.uploadImageForm.get('image').value.name);

        this.galleryService.uploadImage(formData).subscribe(
            (res) => {
                this.response = res;
                this.imageUrl = `${res.file}/`;
                console.log(res);
                console.log(this.imageUrl);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    editButtonClick(event){
        this.isEditMode= true;
        
        console.log(this.isEditMode);
    }
}
