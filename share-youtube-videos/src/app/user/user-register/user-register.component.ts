import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserService } from 'src/app/services';

@Component({
    selector: 'user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
    submitted = false;
    userForm: FormGroup;
    serviceErrors: any = {};

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private userService: UserService
    ) {}

    invalidName() {
        return (this.submitted && (this.serviceErrors.name != null || this.userForm.controls.name.errors != null));
    }

    invalidGender() {
        return (this.submitted && (this.serviceErrors.gender != null || this.userForm.controls.gender.errors != null));
    }

    invalidEmail() {
        return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
    }

    invalidPhone() {
        return (this.submitted && (this.serviceErrors.phone != null || this.userForm.controls.phone.errors != null));
    }

    invalidPassword() {
        return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            gender: ['male', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
            phone: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.userForm.invalid == true) {
            return;
        }
        else {
            let data: any = Object.assign(this.userForm.value);
            this.userService.register(data).subscribe(
            (res: any) => {
                localStorage.setItem('logged', JSON.stringify(res));
                this.router.navigate(['']);
            }, error => {
                this.serviceErrors = error.error.error;
            });
        }
    }

}
