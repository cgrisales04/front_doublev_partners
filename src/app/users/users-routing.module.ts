import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { UserComponent } from './pages/user/user.component';
import { ChartsFollowersComponent } from './pages/charts-followers/charts-followers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent
      },
      {
        path: 'search-user/:user_login',
        component: UserComponent
      },
      {
        path: 'charts',
        component: ChartsFollowersComponent
      },
      {
        path: '**',
        redirectTo: 'list-users'
      }

    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
