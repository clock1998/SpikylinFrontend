import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../../shared/models/user';
import { UserService  } from '../../../../core/services/user.service';
import { AuthenticationService  } from '../../../../core/services/authentication.service';


@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent {
    loading = false;
    users: User[];
    user: User;

    constructor(private userService: UserService, private authService: AuthenticationService ) { }

    ngOnInit() {
        // this.loading = true;
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
        this.loading = true;
        this.userService.getCurrentUser().subscribe((user)=>{
            this.user = user;
        });
        console.log(this.user);
    }
}