import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { Tag } from 'src/app/shared/models/tag';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Photo } from 'src/app/shared/models/photo';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: [ './image.component.scss' ]
})
export class ImageComponent implements OnInit, OnChanges {
    @Input() photo: Photo;
    @Input() editMode: boolean;
    @Input() tags: Tag[];
    @Output() clickedImageEmitter: EventEmitter<Photo> = new EventEmitter<Photo>();
    @Output() deleteImageEmitter: EventEmitter<Photo> = new EventEmitter<Photo>();
    showDeleteButton:boolean = false;

    staticFiles: string = environment.staticImage;

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
            image: [''],
            description: [this.photo.description],
            tags:[this.photo.imageTagDocs]
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

	showLightBox(photo:Photo): void {
		this.clickedImageEmitter.emit(photo);
    }
    
    deleteButtonClick(photo:Photo):void{
        this.deleteImageEmitter.emit(photo);
    }


    onImageSelect(event) {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
            // this.uploadImageForm.get('image').setValue(file);
        }
    }

    onImageSubmit() {
        this.ng2ImgMax.compressImage(this.file, 1).subscribe(
            result => {
                console.log(result)
                this.file = result;
                const formData = new FormData();
                formData.append('file', this.file, this.file.name);
                formData.append('name', this.file.name);
                formData.append('description', this.uploadImageForm.get('description').value);
                this.uploadImageForm.get('tags').value.forEach(element => {
                    formData.append('tags', element);
                });

                this.galleryService.updateImage(formData, this.photo.id).subscribe(
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
}
