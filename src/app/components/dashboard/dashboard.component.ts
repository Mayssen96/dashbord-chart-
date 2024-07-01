import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType, TooltipItem } from 'chart.js';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';

interface UserAgeData {
  range: string;
  count: number;
}

interface UserStatusCounts {
  activeUsers: number;
  inactiveUsers: number;
}

@Component({
  templateUrl: './dashboard.component.html',
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  adminCount!: number;
  clientCount!: number;
  activeUsers!: number;
  inactiveUsers!: number;

  // Doughnut Chart for User Roles
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

  // Doughnut Chart for User Age Categories
  ageCategoryChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const index = tooltipItem.dataIndex;
            const dataset = tooltipItem.dataset as ChartData<'doughnut'>['datasets'][number];
            const count = dataset.data?.[index] as number;
            return `User number: ${count}`;
          }
        }
      }
    }
  };
  ageCategoryChartLabels: string[] = [
    '1950-1954', '1955-1959', '1960-1964', '1965-1969', '1970-1974',
    '1975-1979', '1980-1984', '1985-1989', '1990-1994', '1995-1999', '2000-2005'
  ];
  ageCategoryChartData: ChartData<'doughnut'> = {
    labels: this.ageCategoryChartLabels,
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF8A80', '#4DB6AC', '#F4D03F', '#BA68C8', '#80CBC4', '#FFD54F'
      ],
      hoverOffset: 4
    }]
  };
  ageCategoryChartType: ChartType = 'doughnut';
  ageCategoryChartLegend = true;

  // Doughnut Chart for User Status
  userStatusChartOptions: ChartOptions = {
    responsive: true,
  };
  userStatusChartLabels: string[] = ['Active Users', 'Inactive Users'];
  userStatusChartData: ChartData<'doughnut'> = {
    labels: this.userStatusChartLabels,
    datasets: [{
      data: [],
      backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 159, 64)'],
      hoverOffset: 4
    }]
  };
  userStatusChartType: ChartType = 'doughnut';
  userStatusChartLegend = true;

  loadingDoughnutChart = true;
  loadingAgeCategoryChart = true;
  loadingUserStatusChart = true;

  displayUserRolesChart = false;
  displayAgeCategoryChart = false;
  displayUserStatusChart = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadUsersByAgeCategoryData();
    this.loadUserStatusData();
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

  loadUsersByAgeCategoryData() {
    this.userService.getUserCountsByAge().subscribe(
      (data: UserAgeData[]) => {
        this.ageCategoryChartLabels = data.map(item => item.range);
        this.ageCategoryChartData.datasets[0].data = data.map(item => item.count);
        this.loadingAgeCategoryChart = false;
      },
      (error) => {
        console.error('Error fetching user counts by age:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user counts by age.'
        });
        this.loadingAgeCategoryChart = false;
      }
    );
  }

  loadUserStatusData() {
    this.userService.getUserStatusCounts().subscribe(
      (data: UserStatusCounts) => {
        this.activeUsers = data.activeUsers;
        this.inactiveUsers = data.inactiveUsers;
        this.userStatusChartData.datasets[0].data = [this.activeUsers, this.inactiveUsers];
        this.loadingUserStatusChart = false;
      },
      (error) => {
        console.error('Error fetching user status counts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load user status counts.'
        });
        this.loadingUserStatusChart = false;
      }
    );
  }

  showUserRolesChart() {
    this.displayUserRolesChart = true;
    this.displayAgeCategoryChart = false;
    this.displayUserStatusChart = false;
  }

  showAgeCategoryChart() {
    this.displayUserRolesChart = false;
    this.displayAgeCategoryChart = true;
    this.displayUserStatusChart = false;
  }

  showUserStatusChart() {
    this.displayUserRolesChart = false;
    this.displayAgeCategoryChart = false;
    this.displayUserStatusChart = true;
  }
}
