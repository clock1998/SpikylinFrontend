import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TagService } from 'src/app/core/services/tag.service';
import { Tag, } from 'src/app/shared/models/tag';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Photo } from 'src/app/shared/models/photo';
import { environment } from 'src/environments/environment';
import { AppError } from 'src/app/shared/errors/app-error';
import { NotFoundError } from 'src/app/shared/errors/not-found-error';
import { BadInput } from 'src/app/shared/errors/bad-input-erorr';
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
        ]),
        trigger('imageFade', [
			transition('void => *', [
                style({ opacity: '0',  transform: 'scale(0.2)'}),
                animate('300ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
            ]),
            transition('* => void', [
                style({ opacity: '1',transform: 'scale(1)' }),
                animate('300ms ease-in-out', style({ opacity: 0, transform: 'scale(0.2)'}))
            ]),
        ]),
	]
})
export class GalleryComponent implements OnInit {
    photos: Photo[]=[];
    photosTemp: Photo[]=[];
    tags:Tag[]=[];
    isLightBoxShown: boolean = false;
    tagClicked:boolean = false;
    imageUrl: string = '';
    description: string = '';
    photoMeta: string;
    tagsInString: string = '';
    canManageGallery:boolean = false;
    isEditMode:boolean = false;
    uploadImageForm: FormGroup;
    uploadImageFormError:string = '';

    newTagForm: FormGroup;
    newTagFormError: string = '';
    file:File;
    imagePreviewUrl: any;

    //#region chips componet
    @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    removable = true;
    tagChips:Tag[] = [];
    allTagChips:Tag[] = [];
    filteredTagChips: Observable<Tag[]>;
    tagControl = new FormControl();
    separatorKeysCodes: number[] = [ENTER, COMMA];

    //#endregion

    constructor( private galleryService: GalleryService,
        private tagService:TagService,
        private authentication: AuthenticationService,
        private ng2ImgMax: Ng2ImgMaxService) {
            this.filteredTagChips = this.tagControl.valueChanges.pipe(
                map((tag:string | null) => tag ? this._filter(tag) : this.allTagChips.slice()));
        }

    ngOnInit(): void {
        this.getTags();
        this.getPhotos();
        this.canManageGallery = this.authentication.isLoggedIn();
        this.uploadImageForm = new FormGroup({
            photoname: new FormControl(''),
            description: new FormControl(''),
            tags:new FormControl(''),
        });
        this.newTagForm = new FormGroup({
            tag: new FormControl('', Validators.required),
        });
	}

    //#region image actions
	getPhotos(): void {
		this.galleryService.get().subscribe((photos) => {
            this.photos = photos;
            this.photos.forEach(photo => {
                photo.tagsInString='';
                photo.imageTagDocs.forEach(tagDoc => {
                    photo.tagsInString+=tagDoc.title;
                });
            },
            (error:AppError) => {
                throw error
            });
            this.photosTemp=this.photos;
		});
    }

    addPhoto() {
        if(this.file){
            this.ng2ImgMax.compressImage(this.file, 1.5).subscribe(
                result => {
                    this.file = result;
                    const formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('photoname', this.uploadImageForm.get('photoname').value);
                    formData.append('photometa', this.getExif());
                    formData.append('description', this.uploadImageForm.get('description').value);
                    this.tagChips.forEach(element => {
                        formData.append('ImageTagIds', element.id);
                    });

                    this.galleryService.create(formData).subscribe(
                        (res) => {
                            this.getPhotos();
                            this.uploadImageForm.reset();
                        },
                        (error: AppError) => {
                            if(error instanceof BadInput){
                                this.uploadImageForm.setErrors(error.orginalError);
                            }
                            else{
                                throw error;
                            }
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

    deleteImage(photo:Photo):void{
        this.galleryService.delete(photo.id).subscribe(
            (res) => { },
            (error: AppError) => {
                if (error instanceof BadInput) {
                    this.uploadImageForm.setErrors(error.orginalError);
                }
                else {
                    throw error;
                }
            });
        let index =  this.photosTemp.findIndex(x => x.id==photo.id);
        if (index > -1) {
            this.photosTemp.splice(index, 1);
        }
    }
    //#endregion

    onUploadImageSelect(event) {
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

    //#region tag header actions
    showAllTagClick():void{
        this.photosTemp=this.photos;
    }

    tagClick(tag): void {
        this.tagClicked = !this.tagClicked;
        this.photosTemp = [];
        this.photos.forEach(photo => {
            if (photo.imageTagIds.includes(tag.id)) {
                this.photosTemp.push(photo);
            }
        });
    }
    //#endregion

    //#region light box
	  showLightBox(photo: Photo): void {
        this.isLightBoxShown = true;
        this.imageUrl = environment.StaticImage + photo.fileName;
        this.description = photo.description;
        this.tagsInString = photo.tagsInString;
        this.photoMeta = photo.photoMeta;
    }

    //#endregion

    getTags():void{
        this.tagService.get().subscribe((tags) =>{
            this.tags = tags;
            this.allTagChips = tags;
        },
        (error: AppError) => {
            throw error;
        })
    }

    createTag():void{
        let tag = new Tag;
        tag.title = this.newTagForm.get('tag').value;
        this.tagService.create(tag).subscribe((res) => {
            this.newTagForm.reset();
            this.getTags();
        },
        (error) => {
            if(error instanceof BadInput){
                this.newTagFormError = error.orginalError;
            }
            else{
                throw error;
            }
        });
    }

    //#region get imgae meta data
    getExif():string {
        const img = document.createElement("img");
        img.src = this.imagePreviewUrl;
        let metaData = '';
        let cameraModel: string = '';
        let exposureTime: string = '';
        let fStop: string = '';
        let focalLength: string = '';
        let ISO: string = '';
        EXIF.getData(img, function() {
            const model = EXIF.getTag(this, 'Model');
            if(model != null){
                cameraModel = model;
            }

            const ExposureTime = EXIF.getTag(this, 'ExposureTime');
            if(ExposureTime != null){
                exposureTime =`${ExposureTime.numerator}/${ExposureTime.denominator}s`;
            }

            const FNumber = EXIF.getTag(this, 'FNumber');
            if(FNumber != null){
                fStop =`F${FNumber.numerator/FNumber.denominator}`;
            }

            const FocalLength = EXIF.getTag(this, 'FocalLength');
            if(FocalLength != null){
                focalLength =`${FocalLength.numerator/FocalLength.denominator}mm`;
            }

            const ISOSpeedRatings = EXIF.getTag(this, 'ISOSpeedRatings');
            if(ISOSpeedRatings != null){
                ISO =`ISO${ISOSpeedRatings} `;
            }
            metaData = ` ${cameraModel} ${fStop} ${exposureTime} ${ISO} ${focalLength}`;
        });
        return metaData;
    }
    //#endregion

    editButtonClick(){
        this.isEditMode = !this.isEditMode;
    }

    //#region chips compoent
    remove(tag: Tag): void {
        const index = this.tagChips.indexOf(tag);

        if (index >= 0) {
            this.tagChips.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tagChips.push(event.option.value);
        this.tagInput.nativeElement.value = '';
        this.tagControl.setValue(null);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        this.tags.forEach(element => {
            if (element.title == input.value) {
                this.tagChips.push(element);
            }
        });

        if (input) {
          input.value = '';
        }

        this.tagControl.setValue(null);
      }

    private _filter(value: string): Tag[] {
    const filterValue = value;
    return this.allTagChips.filter(tag => tag.title.toLowerCase().indexOf(filterValue) === 0);
    }
    //#endregion
}
