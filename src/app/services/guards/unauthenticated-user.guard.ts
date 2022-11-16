import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedUserGuard implements CanActivate {
    constructor(
        private readonly userService: UserService,
        private readonly router: Router
    ) { }

    public canActivate() {
        if (this.userService.isLoggedin) {
            this.router.navigate(['']);
            return false;
        }

        return true;
    }  
}
