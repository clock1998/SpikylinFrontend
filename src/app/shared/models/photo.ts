import { Tag } from "./tag";

export class Photo {
	id: string;
	photoName: string;
	fileName: string;
    photoMeta: string;
    description: string;
    imageTagIds: string[];
    imageTagDocs: Tag[];
    tagsInString: string;
    created: string;
    lastUpdated: string;
}
