import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../../../shared/models/user';
import { UserService  } from '../../../../core/services/user.service';
import { AuthenticationService  } from '../../../../core/services/authentication.service';


@Component({ templateUrl: 'dashboard.component.html' })
export class DashboardComponent {
    loading = false;
    users: User[];
    user:User = {email:"", id:0, username:""};

    constructor(private userService: UserService, private authService: AuthenticationService ) { }

    ngOnInit() {
        this.loading = true;
        this.getCurrentUser();
    }

    getCurrentUser(): void{
        this.userService.getCurrentUser().subscribe((data: User) => this.user = {
            id: (data as any).id,
            username:(data as any).username,
            email:(data as any).email
        });
    }
}