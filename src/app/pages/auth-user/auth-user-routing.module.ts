import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from 'src/app/data/constants/app-route.constant';
import { redirectUserGuard } from 'src/app/data/guards/redirecth-user.guard';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  {
    path: AppRoute.AUTH,
    canActivate: [redirectUserGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginUserComponent,
        title: 'Iniciar Sesión como Usuario'
      },
      {
        path: AppRoute.REGISTER,
        component: RegisterUserComponent,
        title: 'Registrarse como Usuario'
      }
    ]
  },
  {
   path: '',
   loadChildren: () =>
     import('../../layout/layout.module').then((m) => m.LayoutModule),
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthUserRoutingModule { }
