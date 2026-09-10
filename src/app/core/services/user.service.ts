import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;

    // private apiUrl =
    //     'http://localhost:5000/api/users';


    constructor(
        private http: HttpClient
    ) { }


    getSalesUsers(): Observable<any> {

        return this.http.get(
            `${this.apiUrl}/sales`
        );
    }
}