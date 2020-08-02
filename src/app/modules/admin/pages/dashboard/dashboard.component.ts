import { Component } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { User } from '../../../../shared/models/user';
import { UserService  } from '../../../../core/services/user.service';
import { AuthenticationService  } from '../../../../core/services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GalleryService } from 'src/app/core/services/gallery.service';


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent {
    loading = false;
    users: User[];
    user: User = {email:"", id:0, username:""};
    form: FormGroup;
    
    response: any;
    imageUrl: string;

    constructor(private galleryService: GalleryService, 
        private formBuilder: FormBuilder, 
        private userService: UserService, 
        private authService: AuthenticationService ) { }

    ngOnInit() {
        this.loading = true;
        this.getCurrentUser();
        this.form = this.formBuilder.group({
			image:['']
		})
    }

    getCurrentUser(): void{
        this.userService.getCurrentUser().subscribe((data: User) => this.user = {
            id: (data as any).id,
            username:(data as any).username,
            email:(data as any).email
        });
    }

    onChange(event) {
		if (event.target.files.length > 0) {
		  const file = event.target.files[0];
		  this.form.get('image').setValue(file);
		}
	}

	onSubmit() {
        const formData = new FormData();

        formData.append('file', this.form.get('image').value);
        formData.append('name', this.form.get('image').value.name);

		this.galleryService.uploadImage(formData).subscribe(
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
}