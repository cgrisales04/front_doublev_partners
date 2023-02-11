import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { UserComponent } from './pages/user/user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ChartsFollowersComponent } from './pages/charts-followers/charts-followers.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent,
    ListUsersComponent,
    NavbarComponent,
    ChartsFollowersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ChartsModule
  ]
})
export class UsersModule { }
