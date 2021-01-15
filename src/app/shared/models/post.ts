import { BaseMO } from "./baseMO";
import { User } from "./user";

export class Post extends BaseMO {
    title:string;
    content: string;
    user: User;
}
