import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  post$: Observable<any>;
  constructor( private blogService: BlogService) { }

  ngOnInit(): void {

  }

}

