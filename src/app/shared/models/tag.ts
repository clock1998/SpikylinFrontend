import { TagContentType } from '@angular/compiler';
import { BaseMO } from './baseMO';
export class Tag extends BaseMO {
    title: string;
}
export class ImageTag extends Tag {
    id: string;
    image:string;
    tag: string;
}
