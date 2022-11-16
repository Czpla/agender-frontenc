import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) { }

    public canActivate() {
        if (this.userService.isLoggedin) {
            return true;
        }

        this.router.navigate(['login']);

        return false;
    }  
}
