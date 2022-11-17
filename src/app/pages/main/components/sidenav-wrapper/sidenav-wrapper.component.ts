import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-wrapper',
  templateUrl: './sidenav-wrapper.component.html',
  styleUrls: ['./sidenav-wrapper.component.scss']
})
export class SidenavWrapperComponent implements OnInit {

    isExpanded: boolean = false;

    constructor(
        private readonly userService: UserService,
    ) { }

    ngOnInit(): void { }

    public logout(): void {
        this.userService.logout();
    }
}
