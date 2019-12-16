import {Component, AfterViewInit, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { IncomingDto } from 'src/app/models/IncomingDto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '8px';
        this.containerHeight = '300px';
      }
    });

    breakpointObserver.observe([
      Breakpoints.Small,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '24px';
        this.containerHeight = '400px';
      }
    });

    breakpointObserver.observe([
      Breakpoints.Medium,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '24px';
        this.containerHeight = '300px';
      }
    });
  }

  @Input() consultants: IncomingDto[];

  public containerHeight = '400px';
  public layoutGap = '24px';

  legend = true;
  labels = true;
  doughnut = false;
  dataSource: any = [];
  legendPosition = "center";
  legendTitle="Participação no Receita Líquida";

  public ngAfterViewInit() {
  }
  resolveData() {
    if (this.consultants && this.consultants.length !== this.dataSource.length) {
    this.dataSource = [];
    this.consultants.forEach(item => this.dataSource.push({
      name: item.noUsuario,
      value: item.earningPercent
    }));

    return this.dataSource;
  }
    return this.dataSource;
  }
}
