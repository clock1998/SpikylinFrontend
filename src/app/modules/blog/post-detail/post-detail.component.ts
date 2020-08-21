import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { Post } from 'src/app/shared/models/post';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
    post: Post = new Post();
    user: User;
    showDeleteButton: boolean = false;
    showUpdateForm: boolean = false;
    updatePostForm: FormGroup;
    public Editor = ClassicEditor;
    id;
    constructor(
        private blogService: BlogService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.getPostId();
        this.getPost();
        this.updatePostForm = this.formBuilder.group({
            title: [ '', Validators.required],
            content: ['', Validators.required]
        })
    }

    getPostId(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.id = params.get('id');
        });
    }

    getPost(): void {
        this.blogService.getPost(this.id).subscribe(
            data => { 
                this.post = data; 
                this.getCurrentUser(); 
                this.updatePostForm = this.formBuilder.group({
                    title: [ this.post.title, Validators.required],
                    content: [this.post.content, Validators.required]
                });
            });
    }

    deletePost(): void {
        this.blogService.deletePost(this.id).subscribe(() => {
            this.router.navigate(['/blog']);
        });
    }

    isOwner(): void {
        if (this.user && this.user.username === this.post.author) {
            this.showDeleteButton = true;
            this.showUpdateForm = true;
        }
    }

    getCurrentUser(): void {
        this.userService.getCurrentUser().subscribe((data: User) => this.user = {
            id: (data as any).id,
            username: (data as any).username,
            email: (data as any).email
        }, error => {
            this.showDeleteButton = false;
        }, () => {
            this.isOwner();
        });
    }

    onPostSubmit() {
        const formData = new FormData();
        formData.append('title', this.updatePostForm.get('title').value);
        formData.append('content', this.updatePostForm.get('content').value);
        this.blogService.updatePost(formData, this.id).subscribe((res) => {
            location.reload(true);
        },
        (err) => {
            console.log(err);
        });
    }
}
