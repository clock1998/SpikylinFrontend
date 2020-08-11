import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post:Post = new Post();
  id;
  constructor( private blogService: BlogService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPost();

  }
 
  getPostId():void {
    this.activatedRoute.paramMap.subscribe(params => { 
      console.log(params);
       this.id = params.get('id'); 
       this.getPost();
   });
  }

  getPost():void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.getPost(id).subscribe(data => {this.post = data});
  }
}
