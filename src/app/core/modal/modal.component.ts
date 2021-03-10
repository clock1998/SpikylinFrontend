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
    ])
	]
})
export class ModalComponent implements OnInit {
  @Input('img-url') imgUrl:string;
  @Input('visible') visible:boolean;
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
	hide(): void {
		this.visible = false;
    this.visibleChange.emit();
  }
}
