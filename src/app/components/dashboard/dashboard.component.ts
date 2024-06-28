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
  adminCount!: number ;
  clientCount!: number ;
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

  constructor(
    private userService: UserService,
    private reservationService: ReservationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadReservationData();
    this.getUserCounts();
    this.loadUsersByAgeData();
  }

  getUserCounts() {
    this.userService.getUserCountsByRole().subscribe(
      (data) => {
        this.adminCount = data.adminCount;
        this.clientCount = data.clientCount;
      },
      (error) => {
        console.error('Error fetching user counts:', error);
        // Handle error appropriately, e.g., show an error message
      }
    );
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

  loadUsersByAgeData() {
    this.userService.getUserCountsByAge().subscribe(
      (data) => {
        // Update bar chart data with age group counts from backend
        this.barChartData.datasets[0].data = data;
      },
      (error) => {
        console.error('Error loading users by age data:', error);
        // Handle error appropriately
      }
    );
  }
}
