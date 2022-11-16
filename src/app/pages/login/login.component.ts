import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IUser, UserService } from 'src/app/services/user.service';
import { LodingService } from '../../services/loding.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    public loginGroup!: FormGroup;
    public loading$ = this.lodingService.loading$;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly lodingService: LodingService,
        private readonly userService: UserService,
        private readonly snackBar: MatSnackBar
    ) { }

    public ngOnInit(): void {
        this.loginGroup = this.formBuilder.group({
            emailFormControl: new FormControl('', [Validators.required, Validators.email]),
            passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });
    }

    public get emailFormControl(): FormControl {
        return this.loginGroup.get('emailFormControl') as FormControl;
    }

    public get passwordFormControl(): FormControl {
        return this.loginGroup.get('passwordFormControl') as FormControl;
    }

    public formInvalid(): boolean {
        return this.loginGroup.invalid;
    }

    public submit() {
        this.lodingService.show();

        const user: IUser = {
            email: this.emailFormControl.value,
            password: this.passwordFormControl.value
        };

        this.userService.login(user).subscribe((response) => {
            if (!response.sucesso) {
                this.snackBar.open('Authentication failed', 'incorrect username or password.', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    
                });
            }
        });

        this.lodingService.hide();
    }
}
