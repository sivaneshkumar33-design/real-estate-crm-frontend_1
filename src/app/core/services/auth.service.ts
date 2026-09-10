import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { environment } from '../environments/environment';
environment
interface LoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: 'ADMIN' | 'SALES';
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // private apiUrl = 'http://localhost:5000/api/auth';
    private apiUrl = `${environment.apiUrl}/auth`;
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {

        return this.http.post<LoginResponse>(
            `${this.apiUrl}/login`,
            {
                email,
                password
            }
        ).pipe(

            tap(response => {

                if (response.success) {

                    localStorage.setItem(
                        'token',
                        response.token
                    );

                    localStorage.setItem(
                        'user',
                        JSON.stringify(response.user)
                    );
                }

            })

        );
    }

    logout(): void {

        localStorage.removeItem('token');
        localStorage.removeItem('user');

    }

    getToken(): string | null {

        return localStorage.getItem('token');

    }

    getUser(): any {

        const user = localStorage.getItem('user');

        return user ? JSON.parse(user) : null;

    }

    isLoggedIn(): boolean {

        return !!this.getToken();

    }
}