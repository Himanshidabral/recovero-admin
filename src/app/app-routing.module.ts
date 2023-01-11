import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CHANGE_PASSWORD_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, USER_ROUTE } from './constants/route.constants';
import { ContainerComponent } from './container/container.component';
import { AuthGuard } from './guards/auth.guard';
import { ProtectGuard } from './guards/protect.guard';

const routes: Routes = [

  {
    path: "",
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: DASHBOARD_ROUTE.path,
        pathMatch: 'full',

      },
      {
        path: DASHBOARD_ROUTE.path,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard],
        data:{roles:[1,2]}
      },
      {
        path: 'billing',
        loadChildren: () => import('./pages/billing/billing.module').then(m => m.BillingModule),
        canActivate: [AuthGuard],
        data:{roles:[1]}
      },
      {
        path: USER_ROUTE.path,
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard],
        data:{roles:[1]}
      },
      {
        path: CHANGE_PASSWORD_ROUTE.path,
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
        data:{roles:[1,2]}

      }
    ],
  },
  {
    path: LOGIN_ROUTE.path,
    component: LoginComponent,
    canActivate: [ProtectGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
