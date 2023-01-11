import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { USER_DETAIL_ROUTE, USER_LIST_ROUTE } from './constants/route.constant';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: USER_LIST_ROUTE.path,
    pathMatch: 'full',
  },
  {
    path: USER_LIST_ROUTE.path,
    component: UsersListComponent,
    data: {heading: 'USER LIST'}
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class UsersRoutingModule { }
