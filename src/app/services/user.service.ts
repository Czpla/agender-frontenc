import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';

export interface IUser {
    uuid?: number;
    email: string;
    password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

    public apiUrlLogin = `${environment.apiUrl}/login`;

    constructor(
        // private readonly httpClient: HttpClient,
        private readonly router: Router
    ) { }

    public login(user: IUser) : Observable<any> {
        // return this.httpClient.post<any>(apiUrlUser, user).pipe(
        // tap((resposta) => {
        //     if(!resposta.sucesso) return;
        //     localStorage.setItem('token', btoa(JSON.stringify(resposta['token'])));
        //     localStorage.setItem('user', btoa(JSON.stringify(resposta['user'])));
        //     this.router.navigate(['']);
        // }));

        return this.mockUsuarioLogin(user).pipe(tap((response) => {
            if(!response.sucesso) return;

            localStorage.setItem('token', Buffer.from('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9').toString('base64'));
            localStorage.setItem('user', Buffer.from(JSON.stringify(user)).toString('base64'));
            this.router.navigate(['']);
        }));
    }

    private mockUsuarioLogin(user: IUser): Observable<any> {

        var retornoMock: any = [];
        if(user.email === 'edu.czpla@gmail.com' && user.password == '12345678'){
            retornoMock.sucesso = true;
            retornoMock.user = user;
            retornoMock.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
            return of(retornoMock);
        }

        retornoMock.sucesso = false;
        retornoMock.user = user;

        return of(retornoMock);
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