import { Component, OnInit } from '@angular/core';
import { VideoModel } from '../models/VideoModel';
import { VideoService } from '../services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    videoModel : VideoModel;
    constructor(
        private videoService: VideoService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.videoService.listVideo()
            .subscribe(res => {
                this.videoModel = res.data;
        },
        err => {
            console.log(err);
        })
    }

    videoURL(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url.includes('watch?v=') ? url.replace('watch?v=', 'embed/') : url);
    }

}
