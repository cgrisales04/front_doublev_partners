import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Item } from '../../interface/users.interface';
import { switchMap } from 'rxjs/operators';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_selected: Item = {
    login: '',
    id: 0,
    node_id: '',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: '',
    site_admin: false,
    score: 0,
    followers: 0
  };

  constructor(private activate_route: ActivatedRoute,
    private user_service: UsersService,
    private sweet_alert: SweetAlertService) {

  }

  ngOnInit(): void {
    this.activate_route.params
      .pipe(
        switchMap(({ user_login }) => this.user_service.getUser(user_login))
      )
      .subscribe((user_selected) => {
        this.sweet_alert.alertModal('success', "Se ha seleccionado el usuario con exito")
        this.user_selected = user_selected
      })
  }

  validateInputs(key: any) {
    return this.user_selected[key as keyof Item] != null ? this.user_selected[key as keyof Item] : "No registrado";
  }
}
