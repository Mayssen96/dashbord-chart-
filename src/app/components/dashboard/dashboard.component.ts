import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType, TooltipItem } from 'chart.js';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/_services/users.service';

interface UserAgeData {
  range: string;
  count: number;
}

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

  ageCategoryChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'doughnut'>) => {
            const index = tooltipItem.dataIndex;
            const dataset = tooltipItem.dataset as ChartData<'doughnut'>['datasets'][number];
            const count = dataset.data?.[index] as number;
            const percentage = ((count / this.totalUsers) * 100).toFixed(2);
            const label = dataset.label ?? '';
            const ageRange = this.ageCategoryChartLabels[index] ?? '';
            
            return `User number: ${count} (${percentage}%) - Age Range: ${ageRange}`;
          }
        }
      }
    }
  };
  
  ageCategoryChartLabels: string[] = [];
  ageCategoryChartData: ChartData<'doughnut'> = {
    labels: this.ageCategoryChartLabels,
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 218, 121, 0.6)',
        'rgba(245, 176, 142, 0.6)',
        'rgba(226, 145, 192, 0.6)',
        'rgba(187, 222, 251, 0.6)',
        'rgba(208, 233, 190, 0.6)',
        'rgba(255, 218, 121, 0.6)',
        'rgba(245, 176, 142, 0.6)',
        'rgba(226, 145, 192, 0.6)',
        'rgba(187, 222, 251, 0.6)',
        'rgba(208, 233, 190, 0.6)'
      ],
      hoverOffset: 4
    }]
  };
  ageCategoryChartType: ChartType = 'doughnut';
  ageCategoryChartLegend = true;

  loadingDoughnutChart = true;
  loadingAgeCategoryChart = true;
  totalUsers: number = 0;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserRolesData();
    this.loadUsersByAgeCategoryData();
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
        this.totalUsers = data.reduce((sum, item) => sum + item.count, 0);
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
}
