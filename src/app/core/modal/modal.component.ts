import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
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
export class ModalComponent implements OnInit {
  @Input('img-url') imgUrl:string;
  @Input() visible:boolean;
  @Output() visibleChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
	hide(): void {
		this.visible = false;
    this.visibleChange.emit();
  }
}
