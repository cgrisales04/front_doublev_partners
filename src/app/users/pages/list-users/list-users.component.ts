import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Item, User } from '../../interface/users.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SweetAlertService } from '../../services/sweet-alert.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User = {};
  user_selected: Item | undefined = {
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

  search_form: FormGroup = this.fb.group({
    'login': ['', [Validators.required, Validators.maxLength(4), this.validateDoublevpartners]]
  })

  get loginErrorMsg(): string {
    const errors = this.search_form.get('login')?.errors;
    if (errors?.required) {
      return "Campo es obligatorio para la busqueda.";
    } else if (errors?.doublevpartners) {
      return "No puedes escribir la palabra doublevpartners.";
    } else if (errors?.maxlength) {
      return "Solo puedes escribir 4 caracteres.";
    }
    return "";
  }

  constructor(private user_services: UsersService,
    private fb: FormBuilder,
    private sweet_alert: SweetAlertService) { }

  ngOnInit(): void {
    this.user_services.getUsers()
      .subscribe(users => {
        this.users = users
        this.sweet_alert.alertModal('success', "Usuarios encontrados con exito.");
      });
  }

  isValid(input: string) {
    return this.search_form.controls[input].errors && this.search_form.controls[input].touched;
  }

  validateDoublevpartners(control: FormControl) {
    if (control.value?.trim().toLowerCase() == "doublevpartners") {
      return {
        doublevpartners: true
      };
    }
    return null;
  }


  buscar() {
    this.users.items?.map((user: Item) => {
      if (user.login.startsWith(this.search_form.value.login)) {
        this.user_selected = user;
      }
    });

    if (!this.user_selected?.login) {
      this.sweet_alert.alertModal('info', "No se encontraron resultados con la busqueda.");

      return;
    }

    this.renderCards(this.user_selected);

    this.user_selected = undefined;
    this.sweet_alert.alertModal('success', "Usuario encontrado con exito.");
  }

  renderCards(user: Item) {
    document.getElementById("pictures-content")!.innerHTML = `
      <div class="card ms-3 mt-2 me-5 " style="width: 18rem;">
        <img src="${user.avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${user.id} - ${user.login}</h5>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima facere iure
            perspiciatis omnis, incidunt ab. </p>
          <a href="/users/search-user/${user.login}" class="btn btn-success">Ver mas...</a>
        </div>
    </div>
    `;
  }
}
