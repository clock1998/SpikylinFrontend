import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../../../shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Tag, ImageTag } from 'src/app/shared/models/tag';
import { Ng2ImgMaxService } from 'ng2-img-max';
declare var EXIF: any;
// import * as EXIF from 'exif-js';

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
    tags:Tag[]=[];
	isLightBoxShown: boolean = false;
    imageUrl: string = '';
    description: string = '';
    tagsInString: string = '';
    canManageGallery:boolean = false;
    isEditMode:boolean = false;
    uploadImageForm: FormGroup;
    uploadImageFormError:string = '';
    uploadImageFormImageError:string = '';

    newTagForm: FormGroup;
    newTagFormError: string = '';
    file:File;
    imagePreviewUrl: any;

    constructor( private galleryService: GalleryService,
        private tagService:TagService,
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService,
        private ng2ImgMax: Ng2ImgMaxService) {}

    ngOnInit(): void {
        this.getAllImageTags();
        this.getImages();
        this.canManageGallery = this.authentication.isLoggedIn;
        this.uploadImageForm = this.formBuilder.group({
            image: [''],
            description: [''],
            tags:[]
        });
        this.newTagForm = this.formBuilder.group({
            tag: ['', Validators.required],
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

    deleteImage(image:Image):void{
        this.galleryService.deleteImage(image.id).subscribe((res)=>{});
        let index =  this.imagesTemp.findIndex(x => x.id==image.id);
        if (index > -1) {
            this.imagesTemp.splice(index, 1);
        }
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

    getAllImageTags():void{
        this.tagService.getAllImageTags().subscribe((tags) =>{
            this.tags = tags;
        })
    }

    onTagSubmit():void{
        const formData = new FormData();
        formData.append('tag', this.newTagForm.get('tag').value);
        this.tagService.createTag(formData).subscribe((res) => {
            this.newTagForm.reset();
            this.getAllImageTags();
        },
        (err) => {
            this.newTagFormError = err.tag;
        });
    }

    onImageSelect(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];

            var reader = new FileReader();
            reader.readAsDataURL(this.file); 
            reader.onload = (event) => { // called once readAsDataURL is completed
                this.imagePreviewUrl = event.target.result;
            }

            // this.uploadImageForm.get('image').setValue(file);
        }
    }
    onImageSubmit() {
        if(this.file){
            this.ng2ImgMax.compressImage(this.file, 1.5).subscribe(
                result => {
                    this.file = result;
                    const formData = new FormData();
                    formData.append('file', this.file, this.file.name);
                    formData.append('name', this.file.name);
                    formData.append('description', this.uploadImageForm.get('description').value + this.getExif());
                    this.uploadImageForm.get('tags').value.forEach(element => {
                        formData.append('tags', element);
                    });
    
                    this.galleryService.addImage(formData).subscribe(
                        (res) => {
                            this.getImages();
                            this.uploadImageForm.reset();
                        },
                        (err) => {
                            this.uploadImageFormError = err.File;
                            console.log(err);
                        }
                    );
                },
                error => {
                    this.uploadImageFormError = "Image Compress failed!";
                    console.log('Compress failed!', error);
                }
            );
        }
        else{
            this.uploadImageFormError = "File cannot be empty!";
        }
    }

    getExif():string {
        const img = document.createElement("img");
        img.src = this.imagePreviewUrl;
        let metaData = '';
        EXIF.getData(img, function() {
            const model = EXIF.getTag(this, 'Model');
            const ExposureTime = EXIF.getTag(this, 'ExposureTime');
            const FNumber = EXIF.getTag(this, 'FNumber');
            const FocalLength = EXIF.getTag(this, 'FocalLength');
            const ISOSpeedRatings = EXIF.getTag(this, 'ISOSpeedRatings');
            metaData = ` ${model} F${FNumber.numerator/FNumber.denominator} ${ExposureTime.numerator}/${ExposureTime.denominator}s ISO${ISOSpeedRatings} ${FocalLength.numerator/FocalLength.denominator}mm`;
        });
        return metaData;
    }

    editButtonClick(event){
        this.isEditMode= true;
    }
}
