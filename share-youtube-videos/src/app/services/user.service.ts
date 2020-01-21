import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInfoModel } from '../models/UserInfoModel';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class UserService {
    private apiUri = `http://localhost:8080/api/contacts`;

    constructor(private http: HttpClient) {}

    register(user: UserInfoModel) : Observable<any>  {
        return this.http.post<any>(this.apiUri, user, httpOptions);
    }
}