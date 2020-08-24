import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Image } from 'src/app/shared/models/image';
import { GalleryService } from 'src/app/core/services/gallery.service';

@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: [ './image.component.scss' ]
})
export class ImageComponent implements OnInit, OnChanges {
    @Input() image: Image;
    @Input() editMode: boolean;
    @Output() imageUrl: EventEmitter<string> = new EventEmitter<string>();
    @Output() deleteImageEmitter: EventEmitter<Image> = new EventEmitter<Image>();
    showDeleteButton:boolean = false;
	constructor(private galleryService: GalleryService) {}


	ngOnInit(): void {
        this.showDeleteButton=this.editMode;
    }

    ngOnChanges(changes: SimpleChanges): void {
        
    }

	showLightBox(image): void {
		this.imageUrl.emit(image.file);
    }
    
    deleteButtonClick( image:Image):void{
        this.deleteImageEmitter.emit(image);
    }
}
