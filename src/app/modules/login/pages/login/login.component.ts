import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService  } from '../../../../core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({ 
  selector: 'app-login',
  templateUrl: 'login.component.html', 
  styleUrls: [ 'login.component.scss' ]})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    detailError = '';
    usernameError:string;
    passwordError:string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.getAccessToken()) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    
    getCurrentUser(): void {
        this.userService.getCurrentUser().subscribe();
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    this.getCurrentUser();
                    this.router.navigate([this.returnUrl]);
                },
                (err) => {
                    console.log(err.username);
                    this.usernameError = err.username;
                    this.passwordError = err.password;
                    this.detailError = err.detail;
                    this.loading = false;
                });
    }
    
}