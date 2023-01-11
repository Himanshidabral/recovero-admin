import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { UserAddComponent } from './components/user-add/user-add.component';




@NgModule({
  declarations: [
    UsersListComponent,
    UserAddComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  exports: [
    SharedModule,
    MaterialModule,
  ],
  providers:[
    MatNativeDateModule
  ]
})
export class UsersModule { }
