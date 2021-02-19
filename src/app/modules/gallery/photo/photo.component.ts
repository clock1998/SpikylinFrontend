import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { Tag } from 'src/app/shared/models/tag';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Photo } from 'src/app/shared/models/photo';
import { environment } from 'src/environments/environment';
declare var EXIF: any;

@Component({
	selector: 'app-photo',
	templateUrl: './photo.component.html',
	styleUrls: [ './photo.component.scss' ]
})
export class PhotoComponent implements OnInit{
    @Input() photo: Photo;
    @Input() editMode: boolean;
    @Input() tags: Tag[];
    @Output('showPhoto') clickedImageEmitter: EventEmitter<Photo> = new EventEmitter<Photo>();
    @Output('deletePhoto') deleteImageEmitter: EventEmitter<Photo> = new EventEmitter<Photo>();
    showDeleteButton:boolean = false;
    imagePreviewUrl: any;
    staticFiles: string = environment.StaticImage;

	isLightBoxShown: boolean = false;
    imageUrl: string = '';
    description: string = '';
    uploadImageForm: FormGroup;
    file:File;
    constructor(private galleryService: GalleryService, 
        private formBuilder: FormBuilder,
        private ng2ImgMax: Ng2ImgMaxService) {}


	ngOnInit(): void {
        this.showDeleteButton=this.editMode;
        this.uploadImageForm = this.formBuilder.group({
            photo: [''],
            name:[this.photo.photoName],
            description: [this.photo.description],
            tags:[this.photo.imageTagDocs]
        })
    }

	showLightBox(photo:Photo): void {
		this.clickedImageEmitter.emit(photo);
    }
    
    deleteButtonClick(photo:Photo):void{
        this.deleteImageEmitter.emit(photo);
    }

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

    onPhotoSubmit() {
        if(this.file != null){
            this.ng2ImgMax.compressImage(this.file, 1).subscribe(
                result => {
                    this.file = result;
                    const formData = new FormData();
                    formData.append('file', this.file);
                    formData.append('photoname', this.uploadImageForm.get('name').value);
                    formData.append('photometa', this.getExif());
                    formData.append('description', this.uploadImageForm.get('description').value);
                    this.uploadImageForm.get('tags').value.forEach(element => {
                        formData.append('ImageTagIds', element);
                    });
    
                    this.galleryService.update(formData, this.photo.id).subscribe(
                        (res) => {
                            // this.image = res;
                            // console.log(res);
                        },
                        (err) => {
                            console.log(err);
                        }
                    );
                },
                error => {
                    console.log('Compress failed!', error);
                }
            );
        }
        else{
            const formData = new FormData();
            formData.append('photoname', this.uploadImageForm.get('name').value);
            formData.append('description', this.uploadImageForm.get('description').value);
            this.uploadImageForm.get('tags').value.forEach(element => {
                formData.append('ImageTagIds', element);
            });

            this.galleryService.updatePhotoInfo(formData, this.photo.id).subscribe(
                (res) => {
                    // this.image = res;
                    // console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
    
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
}
