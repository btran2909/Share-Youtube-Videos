import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, VideoService } from '../services';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    loginForm: FormGroup;
    shareVideoForm: FormGroup;
    returnUrl: string;
    userName: string;
    serviceErrors: any = {};
    isLogged: boolean;
    submitted = false;
    animal: string;
    description: string;
    user: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private videoService: VideoService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.isLogged = false;
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
        });
        this.shareVideoForm = this.formBuilder.group({
            url: ['', [Validators.required, Validators.email, Validators.maxLength(75)]]
        });
        if (localStorage.getItem('logged')) {
            const user = JSON.parse(localStorage.getItem('logged'));
            this.user = user.data;
            this.isLogged = user.data._id ? true : false;
            this.f.email.setValue(user.data.email);
            this.f.password.setValue(user.data.email);
            this.login();
        }
    }

    invalidEmail() {
        return (this.submitted && (this.serviceErrors.email != null || this.f.email.errors != null));
    }

    invalidPassword() {
        return (this.submitted && (this.serviceErrors.password != null || this.f.password.errors != null));
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid == true) {
            return;
        }
        else {
            this.login();
        }
    }

    login() {
        let data: any = Object.assign(this.loginForm.value);
        this.authenticationService.login(data).subscribe(
            (res: any) => {
                this.userName = this.f.email.value;
                this.isLogged = true;
                this.router.navigate(['']);
            }, error => {
                this.error('Email or password is incorrect');
                alert('Email or password is incorrect');
            });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogShareVideo, {
            width: '500px',
            data: { name: this.userName, animal: this.animal, description: this.description }
        });
        dialogRef.beforeClose().subscribe(data => {
            if(data.animal){
                this.animal = data.url;
                const fileName = this.checkUrlYoutube(data.animal);
                if (fileName) {
                    const req = {
                        title: fileName,
                        url: data.animal,
                        category: 'test',
                        user_id: this.user._id,
                        user_email: data.name,
                        description: data.description
                    };
                    this.videoService.shareVideo(req).subscribe(
                        res => {
                            this.router.navigate(['']);
                        },
                        err => {
                            this.error('youtube url is incorrect');
                        }
                    );
                } else {
                    console.log('Invalid', fileName);
                }
            }
        });
    }

    checkUrlYoutube(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : false;
    }

    logout() {
        this.authenticationService.logout();
        this.error('logged out');
    }

    error(message: string) {
        this.isLogged = false;
        this.submitted = false;
        console.log(message);
    }
}


@Component({
    selector: 'dialog-share-video',
    templateUrl: 'dialog-share-video.html',
    styleUrls: ['./navbar.component.scss']
})
export class DialogShareVideo {

    constructor(
        public dialogRef: MatDialogRef<DialogShareVideo>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}