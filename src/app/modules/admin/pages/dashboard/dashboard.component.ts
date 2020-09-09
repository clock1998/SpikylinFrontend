import { Component } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/user';
import { UserService } from '../../../../core/services/user.service';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GalleryService } from 'src/app/core/services/gallery.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from 'src/app/core/services/blog.service';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public Editor = ClassicEditor;
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

    onChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.uploadImageForm.get('image').setValue(file);
        }
    }

    onImageSubmit() {
        const formData = new FormData();

        formData.append('file', this.uploadImageForm.get('image').value);
        formData.append('name', this.uploadImageForm.get('image').value.name);

        this.galleryService.addImage(formData).subscribe(
            (res) => {
                this.response = res;
                this.imageUrl = `${res.file}/`;
                console.log(res);
                console.log(this.imageUrl);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    onPostSubmit(){
        const formData = new FormData();
        formData.append('title', this.newPostForm.get('title').value);
        formData.append('content', this.newPostForm.get('content').value);
        this.blogService.createPost(formData).subscribe((res) => {
            console.log(res);
        },
        (err) => {
            console.log(err);
        });
    }

    onTagSubmit():void{
        const formData = new FormData();
        formData.append('tag', this.newTagForm.get('tag').value);
        this.tagService.createTag(formData).subscribe((res) => {
            console.log(res);
        },
        (err) => {
            console.error(err);
        });
    }
}