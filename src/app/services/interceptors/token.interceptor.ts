import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly userService: UserService
  ) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getTokenLoggedinUser;
    const requestUrl: Array<string> = request.url.split('/');
    const apiUrl: Array<string> = environment.apiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ token }`,
                token: `${ token }`
            }
        });

        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.userService.logout();
            }

            return throwError(() => new Error(error.message));
        }));
    } else {
        return next.handle(request);
    }
  }
}
