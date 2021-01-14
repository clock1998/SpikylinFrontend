import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog.service';
import { Post } from 'src/app/shared/models/post';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as Editor from 'src/assets/ckeditor5/build/ckeditor';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

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
    public Editor = Editor;
    CKEditorConfig = {
        toolbar: {
            items: [
                'heading',
                'undo',
                'redo',
                '|',
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                'alignment',
                'fontColor',
                'fontSize',
                'fontFamily',
                'horizontalLine',
                'strikethrough',
                'underline',
                '|',
                'indent',
                'outdent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'codeBlock',
                'highlight'
            ]
        },
        language: 'en',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:full',
                'imageStyle:side'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        licenseKey: '',
    }
    id;
    constructor(
        private blogService: BlogService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.getPostId();
        // this.getPost();
        this.user = this.userService.UserInfo;
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

    // getPost(): void {
    //     this.blogService.get(this.id).subscribe(
    //         data => { 
    //             this.post = data;
    //             this.isOwner(); 
    //             this.updatePostForm = this.formBuilder.group({
    //                 title: [ this.post.title, Validators.required],
    //                 content: [this.post.content, Validators.required]
    //             });
    //         });
    // }

    deletePost(): void {
        this.blogService.delete(this.id).subscribe(() => {
            this.router.navigate(['/blog']);
        });
    }

    isOwner(): void {
        console.log(this.user.username)
        console.log(this.post.author)
        if (this.user && this.user.username === this.post.author) {
            this.showDeleteButton = true;
            this.showUpdateForm = true;
        }
    }

    onPostSubmit() {
        const formData = new FormData();
        formData.append('title', this.updatePostForm.get('title').value);
        formData.append('content', this.updatePostForm.get('content').value);
        this.blogService.update(formData, this.id).subscribe((res) => {
            location.reload(true);
        },
        (err) => {
            console.log(err);
        });
    }
}
