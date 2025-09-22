import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../article/article';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  imports: [Article],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {

  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6c19',
        ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      console.log('Full response:', res);

      // Change res.data.myBudget to just res.myBudget
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
}

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (canvas) {
      const myChart = new Chart(canvas, {
        type: 'pie',
        data: this.dataSource
      });
      console.log('Creating chart with data:', this.dataSource);
    } else {
      console.error('Canvas element with id "myChart" not found.');
    }
  }
}
