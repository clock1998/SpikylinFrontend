import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';
import { flatMap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Tag, ImageTag } from 'src/app/shared/models/tag';

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
    images: Image[]=[];
    imagesTemp: Image[]=[];
    tags:Tag[];
	isLightBoxShown: boolean = false;
    imageUrl: string = '';
    description: string = '';
    tagsInString: string = '';
    canManageGallery:boolean = false;
    isEditMode:boolean = false;
    uploadImageForm: FormGroup;
    response: any;

    constructor( private galleryService: GalleryService,
        private tagService:TagService,
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService) {}

    ngOnInit(): void {
        this.getAllImageTags();
        this.getImages();
        this.canManageGallery = this.authentication.isLoggedIn;
        this.uploadImageForm = this.formBuilder.group({
            image: [''],
            description: ['']
        })
	}

	getImages(): void {
		this.galleryService.getImages().subscribe((images) => {
            this.images = images;
            this.images.forEach(image => {
                image.tagsInString='';
                image.tags.forEach(tagId => {
                    this.tags.forEach(tag=>{
                        if(tag.id == tagId){
                            image.tagsInString+=tag.tag+',';
                        }
                    });
                });
            });
            this.imagesTemp=this.images;
		});
    }

    getAllImageTags():void{
        this.tagService.getAllImageTags().subscribe((tags) =>{
            this.tags = tags;
        })
    }

    showAllClick():void{
        this.imagesTemp=this.images;
    }

    tagClick(tag): void {
        this.imagesTemp = [];
        this.images.forEach(image => {
            if (image.tags.includes(tag.id)) {
                this.imagesTemp.push(image);
            }
        });
    }

	showLightBox(image: Image): void {
        this.isLightBoxShown = true;
        this.imageUrl = image.file;
        this.description = image.description;
        this.tagsInString = image.tagsInString;
    }
    
	hideLightBox(): void {
		this.isLightBoxShown = false;
    }
    
    deleteImage(image:Image):void{
        this.galleryService.deleteImage(image.id).subscribe((res)=>{});
        let index =  this.imagesTemp.findIndex(x => x.id==image.id);
        if (index > -1) {
            this.imagesTemp.splice(index, 1);
        }
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
        formData.append('description', this.uploadImageForm.get('description').value);
        this.galleryService.uploadImage(formData).subscribe(
            (res) => {
                this.response = res;
                this.imageUrl = `${res.file}/`;
                this.getImages();
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
    }
}
