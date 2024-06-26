import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';
import { ReservationService } from 'src/app/_services/reservation.service';
import { Reservation } from 'src/app/_models/reservation';

@Component({
  templateUrl: './dashboard.component.html',
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  doughnutChartLabels: string[] = ['Admin', 'Client'];
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
          text: 'Number of Reservations'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Reservations'
        }
      }
    }
  };
  barChartLabels: string[] = ['Reservations'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{
      label: 'Reservations',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadReservationData();
  }

  loadUserRolesData() {
    // Replace with actual service call to get user roles data
    const adminCount = 2; // Example data
    const clientCount = 5; // Example data
    this.doughnutChartData.datasets[0].data = [adminCount, clientCount];
  }

  loadReservationData() {
    this.reservationService.getTotalReservationCount().subscribe(
      count => {
        this.barChartData.datasets[0].data.push(count);
      },
      error => {
        console.error('Error loading reservation count: ', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load reservation count.'
        });
      }
    );
  }
}
