import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';
import { ReservationService } from 'src/app/_services/reservation.service';

@Component({
  templateUrl: './dashboard.component.html',
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  adminCount!: number;
  clientCount!: number;
  doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  doughnutChartLabels: string[] = ['admin', 'client'];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{
      data: [],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
      hoverOffset: 4
    }]
  };
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend = true;
  doughnutChartPlugins = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year of Birth'
        }
      }
    }
  };
  barChartLabels: string[] = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{
      label: 'Users by Age Group',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      borderWidth: 1
    }]
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  loadingDoughnutChart = true;
  loadingBarChart = true;

  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadUsersByAgeData();
  }

  loadUserRolesData() {
    this.userService.getUserCountsByRole().subscribe(
      (data) => {
        this.adminCount = data.adminCount;
        this.clientCount = data.clientCount;
        this.doughnutChartData.datasets[0].data = [this.adminCount, this.clientCount];
        this.loadingDoughnutChart = false;
      },
      (error) => {
        console.error('Error fetching user role counts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user role counts.'
        });
        this.loadingDoughnutChart = false;
      }
    );
  }

  loadUsersByAgeData() {
    this.userService.getUserCountsByAge().subscribe(
      (data) => {
        // Ensure data is an array of numbers representing counts by birth year
        this.barChartData.datasets[0].data = data;
        this.loadingBarChart = false;
      },
      (error) => {
        console.error('Error fetching user counts by age:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user counts by age.'
        });
        this.loadingBarChart = false;
      }
    );
  }
}
