import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from '../../../shared/models/post';
import { BlogService } from 'src/app/core/services/blog.service';
import { trigger, state, style, animate, transition, query, group, animateChild } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  imageUrl: string = '';
  constructor(private blogService: BlogService, private route: ActivatedRoute ) { }
	ngOnInit(): void {
		this.getPosts();

	}

	getPosts(): void {
		this.blogService.getPosts().subscribe((posts) => {
			this.posts = posts;
		});
	}
}
