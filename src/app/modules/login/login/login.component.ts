import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService  } from '../../../core/services/authentication.service';

@Component({ 
  selector: 'app-login',
  templateUrl: 'login.component.html', 
  styleUrls: [ 'login.component.scss' ]})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
        // redirect to home if already logged in
        if (this.authenticationService.isLoggedIn()) { 
            this.router.navigate(['/']);
        }
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get username(){
        return this.loginForm.get('username');
    }
    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    location.reload();
                },
                (err:Response) => {
                    this.loginForm.setErrors({invalidLogin: true})
                });
    }
    
}