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
            const label = dataset.label ?? '';
            
            return `User number: ${count}`;
          }
        }
      }
    }
  };

  ageCategoryChartLabels: string[] = ['1950-1954', '1955-1959','1960-1964','1965-1969','1970-1974','1975-1979','1980-1984','1985-1989','1990-1994','1995-1999','2000-2005'];
  ageCategoryChartData: ChartData<'doughnut'> = {
    labels: this.ageCategoryChartLabels,
    datasets: [{
      data: [],
      backgroundColor: [
        '#FF6384', // Red
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Aqua
        '#9966FF', // Purple
        '#FF8A80', // Coral
        '#4DB6AC', // Teal
        '#F4D03F', // Yellow
        '#BA68C8', // Lavender
        '#80CBC4', // Turquoise
        '#FFD54F'  // Amber
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
