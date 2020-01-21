import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { VideoModel } from '../models/VideoModel';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class VideoService {
    private apiUri = `http://localhost:8080/api/videos`;

    constructor(private http: HttpClient) {}

    listVideo() : Observable<any>  {
        return this.http.get<any>(this.apiUri, httpOptions);
    }

    shareVideo(video: VideoModel) : Observable<any>  {
        return this.http.post<any>(this.apiUri, video, httpOptions);
    }
}