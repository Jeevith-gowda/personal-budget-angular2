import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Article } from '../article/article';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { DataService } from '../data'; // Add this import

@Component({
  selector: 'pb-homepage',
  imports: [Article, Breadcrumbs],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {
  @ViewChild('d3Chart', { static: true }) private chartContainer!: ElementRef;
  private data: any[] = [];

  constructor(private dataService: DataService) { }  // Change this

  ngOnInit(): void {
    this.dataService.fetchBudgetData();

    this.dataService.getBudgetData().subscribe(data => {
      this.data = data;
      if (this.data.length > 0) {
        this.createD3Chart();
      }
    });
  }

  // Keep your existing createD3Chart() method exactly as it is
  private createD3Chart(): void {
    const element = this.chartContainer.nativeElement;
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    d3.select(element).selectAll('*').remove();

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(this.data.map(d => d.title))
      .range(['#ffcd56', '#ff6384', '#36a2eb', '#fd6c19']);

    const pie = d3.pie<any>()
      .value(d => d.budget);

    const arc = d3.arc<any>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll('arc')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.title) as string);

    arcs.append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.title);
  }
}
