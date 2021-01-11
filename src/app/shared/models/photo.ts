import { BaseMO } from "./baseMO";
import { Tag } from "./tag";

export class Photo extends BaseMO {
    photoName: string;
    description: string;
	fileName: string;
    photoMeta: string;
    imageTagIds: string[];
    imageTagDocs: Tag[];
    tagsInString: string;
}
