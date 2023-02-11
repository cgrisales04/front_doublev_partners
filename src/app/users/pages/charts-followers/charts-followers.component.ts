import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-charts-followers',
  templateUrl: './charts-followers.component.html',
  styleUrls: ['./charts-followers.component.css']
})
export class ChartsFollowersComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  }
  public barChartLables: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: "Seguidores" },
  ];

  constructor(private user_service: UsersService) {
    this.getUsers();
  }

  getUsers() {
    this.barChartLables = [];
    this.barChartData[0].data = [];

    this.user_service.getUsers()
      .pipe(
        switchMap(({ items }) => {
          return items!.map((user) => user.login)
        })
      )
      .subscribe((user_selected) => {
        this.user_service.getUser(user_selected)
          .subscribe(({ login, followers }) => {
            this.barChartData[0].data?.push(followers);
            this.barChartLables.push(login);
          })
      })
  }

  ngOnInit(): void {
  }

  public actualizarUsuarios(): void {
    this.getUsers();
  }


}
