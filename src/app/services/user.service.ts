import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';

export interface IUser {
    uuid?: number;
    email: string;
    password: string;
}

type LoginResponse = {
    accessToken: string;
    expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public apiUrlLogin = `${environment.apiUrl}/auth/sign-in`;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router
    ) { }

    public login(user: IUser): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(this.apiUrlLogin, user)
            .pipe(
                tap((response: LoginResponse) => { 

                    localStorage.setItem('token', Buffer.from(response.accessToken).toString('base64'));
                    localStorage.setItem('user', Buffer.from(JSON.stringify(user)).toString('base64'));
                    this.router.navigate(['']);
                }), ((error) => { 

                    return error; 
                }),
            );
    }

    public logout(): void {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    public get getLoggedinUser(): IUser {
        return localStorage.getItem('user') 
            ? JSON.parse(Buffer.from(localStorage.getItem('user') as string, 'base64').toString('ascii')) : null;
    }

    public get getIdLoggedinUser(): string {
        return localStorage.getItem('user')
            ? JSON.parse(Buffer.from(localStorage.getItem('user') as string, 'base64').toString('ascii')).uuid : null;
    }

    public get getTokenLoggedinUser(): string {
        return localStorage.getItem('token')
            ? JSON.parse(Buffer.from(localStorage.getItem('token') as string, 'base64').toString('ascii')) : null;
    }

    public get isLoggedin(): boolean {
        return localStorage.getItem('token') ? true : false;
    }
}