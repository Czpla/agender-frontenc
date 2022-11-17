import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedUserGuard } from './services/guards/authenticated-user.guard';
import { UnauthenticatedUserGuard } from './services/guards/unauthenticated-user.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UnauthenticatedUserGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    canActivate: [AuthenticatedUserGuard],
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: '',
    canActivate: [AuthenticatedUserGuard],
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
