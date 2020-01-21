import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUri = `http://localhost:8080/api`;

    constructor(private http: HttpClient) {}

    login(req) {
        console.log(`${this.apiUri}/login`);
        return this.http.post<any>(`${this.apiUri}/login`, req, httpOptions)
            .pipe(map(user => {
                console.log(user);
                if (user.data && user.data._id) {
                    localStorage.setItem('logged', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('logged');
    }
}