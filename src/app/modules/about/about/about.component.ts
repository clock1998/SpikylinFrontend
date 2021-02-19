import {
	Component,
	OnInit,
	HostListener,
	ViewChild,
	ViewChildren,
	QueryList,
	ElementRef,
	AfterViewInit
} from '@angular/core';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: [ './about.component.scss' ]
})
export class AboutComponent implements OnInit {
	section:string = "About Me";
    ngOnInit(): void {

    }
}
