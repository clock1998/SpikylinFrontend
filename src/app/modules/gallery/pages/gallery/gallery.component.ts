import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../../../../shared/models/image';
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
        private formBuilder: FormBuilder,
        private authentication: AuthenticationService,
        private ng2ImgMax: Ng2ImgMaxService) {
            this.filteredTagChips = this.tagControl.valueChanges.pipe(
                map((tag:string | null) => tag ? this._filter(tag) : this.allTagChips.slice()));
        }

    ngOnInit(): void {
        this.getAllImageTags();
        this.getImages();
        this.canManageGallery = this.authentication.isLoggedIn;
        this.uploadImageForm = new FormGroup({
            image: new FormControl(''),
            description: new FormControl(''),
            tags:new FormControl(''),
        });
        this.newTagForm = new FormGroup({
            tag: new FormControl('', Validators.required),
        });
	}

    //#region image actions
	getImages(): void {
		this.galleryService.getImages().subscribe((photos) => {
            this.photos = photos;
            this.photos.forEach(photo => {
                photo.tagsInString='';
                photo.imageTagDocs.forEach(tagDoc => {
                    photo.tagsInString+=tagDoc.title;
                });
            });
            this.photosTemp=this.photos;
		});
    }

    addImage() {
        if(this.file){
            this.ng2ImgMax.compressImage(this.file, 1.5).subscribe(
                result => {
                    this.file = result;
                    const formData = new FormData();
                    formData.append('file', this.file, this.file.name);
                    formData.append('name', this.file.name);
                    formData.append('description', this.uploadImageForm.get('description').value + this.getExif());
                    if(this.uploadImageForm.get('tags').value){
                        this.uploadImageForm.get('tags').value.forEach(element => {
                            formData.append('tags', element);
                        });
                    }
                    else{
                        this.tagChips.forEach(element => {
                            formData.append('tags', element.id);
                        });
                    }
    
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

    deleteImage(image:Image):void{
        this.galleryService.deleteImage(image.id).subscribe((res)=>{});
        let index =  this.photosTemp.findIndex(x => x.id==image.id);
        if (index > -1) {
            this.photosTemp.splice(index, 1);
        }
    }
    //#endregion

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

    //#region tag header actions
    showAllTagClick():void{
        this.photosTemp=this.photos;
    }

    tagClick(tag): void {
        // this.tagClicked = !this.tagClicked;
        // this.photosTemp = [];
        // this.photos.forEach(image => {
        //     if (image.tags.includes(tag.id)) {
        //         this.imagesTemp.push(image);
        //     }
        // });
    }
    //#endregion

    //#region light box
	showLightBox(photo: Photo): void {
        this.isLightBoxShown = true;
        this.imageUrl = environment.staticImage + photo.fileName;
        this.description = photo.description;
        this.tagsInString = photo.tagsInString;
    }
    
	hideLightBox(): void {
		this.isLightBoxShown = false;
    }
    //#endregion

    getAllImageTags():void{
        this.tagService.getAllImageTags().subscribe((tags) =>{
            this.tags = tags;
            console.log(this.tags)
            this.allTagChips = tags;
        })
    }

    newTag():void{
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

    //#region get imgae meta data
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
    //#endregion

    editButtonClick(event){
        this.isEditMode= true;
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
