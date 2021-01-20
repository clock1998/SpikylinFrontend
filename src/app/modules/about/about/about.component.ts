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
    @ViewChild('aboutMe') aboutMe: ElementRef;
    sections = [];
    scrollPosition = '';
    focused = false ;
	constructor() {}

	@HostListener('window:scroll', [ '$event' ])
	onScrollEvent($event) {}
	ngAfterViewInit() {
	}
    ngOnInit(): void {
    }

    scroll(event, el1:HTMLElement, el2:HTMLElement, el3:HTMLElement, el4:HTMLElement): void{
        const els = [el1, el2, el3, el4];
        els.forEach(el => {
            if(event.target.innerHTML.trim() == el.firstChild.firstChild.textContent.trim()){
                el.className = "showSection";
            }
            else{
                el.className = "hideSection";
            }
        });
    }
}
