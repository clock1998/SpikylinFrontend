import { Component } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../../core/services/user.service';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GalleryService } from 'src/app/core/services/gallery.service';
import { BlogService } from 'src/app/core/services/blog.service';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    loading = false;
    users: User[];
    user: User = { email: "", id: "", username: "" };
    uploadImageForm: FormGroup;
    newPostForm: FormGroup;
    newTagForm:FormGroup;

    response: any;
    imageUrl: string;

    constructor(private galleryService: GalleryService,
        private blogService: BlogService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private tagService: TagService,
        private authService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.user=this.userService.UserInfo;
        this.uploadImageForm = this.formBuilder.group({
            image: ['']
        })
        this.newTagForm = this.formBuilder.group({
            tag: ['', Validators.required],
        })
        this.newPostForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required]
        })
    }

    onPostSubmit(){
        const formData = new FormData();
        formData.append('title', this.newPostForm.get('title').value);
        formData.append('content', this.newPostForm.get('content').value);
        this.blogService.createPost(formData).subscribe((res) => {
            this.newPostForm.reset();
            console.log(res);
        },
        (err) => {
            console.log(err);
        });
    }
}