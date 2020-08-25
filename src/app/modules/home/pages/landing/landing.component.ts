import { Component, OnInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    animations: [
		trigger('startChange', [
            state(
				'change',
				style({
					opacity: 0
				})
			),
            transition('* <=> *', [
                animate('2s ease-in', keyframes([
                    style({ opacity: 0.8, filter:"blur(10px)" }),
                    style({ opacity: 1, filter:"blur(0px)" })
                  ]))
            ]),
            
        ]),
	]
})
export class LandingComponent implements OnInit {
    @ViewChild('home') div;
    backgroundImage:string;
    isBackgroundImageChange:boolean = false;
    images:string[] = ["url(/assets/img/landing1.png)",]
    index:number=0;
    constructor() { }

    ngOnInit(): void {
        this.backgroundImage =this.images[Math.floor(Math.random() * Math.floor(this.images.length))];
        // timer(0, 6000).subscribe(ellapsedCycles => {
        //     if(this.index>this.images.length-1){
        //         this.index = 0;
        //     }
        //     this.toggle();
        //     this.backgroundImage ="url()";
        //     // this.backgroundImage =this.images[this.index];
        //     console.log(this.backgroundImage);
        //     this.index++;
        //   });
        
    }

    ngAfterViewInit() {
        const style = getComputedStyle(this.div.nativeElement);
        this.div.nativeElement.style.backgroundColor = "url(/assets/img/landing1.jpg)";
        console.log(this.div.nativeElement.style.backgroundColor);
    }

    toggle() {
        this.isBackgroundImageChange = !this.isBackgroundImageChange;
      }
    
}
