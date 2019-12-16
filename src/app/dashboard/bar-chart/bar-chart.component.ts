import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { IncomingDto } from 'src/app/models/IncomingDto';
import * as moment from 'moment';
import { DataSourceItem } from 'src/app/models/DataSourceItem';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '8px';
        this.containerHeight = '500px';
      }
    });

    breakpointObserver.observe([
      Breakpoints.Small,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '24px';
        this.containerHeight = '500px';
      }
    });

    breakpointObserver.observe([
      Breakpoints.Medium,
    ]).subscribe((result: any) => {
      if (result.matches) {
        this.layoutGap = '24px';
        this.containerHeight = '500px';
      }
    });
  }

  @Input() consultants: IncomingDto[];

  @ViewChild('flexLayoutContainer', {static: false}) flexLayoutContainerElement: ElementRef;

  public elementStyle: object = {
    'height.px': 50
  };

  public containerStyle: object = {
    'width.px': 300
  };

  public containerHeight = '500px';
  public layoutGap = '24px';

  showXAxis = true;
  trimXAxisTicks = false;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showGridLines = true;
  legendPosition = 'top';
  legendTitle="Desempenho por Consultor";

  dataSource: DataSourceItem[] = [];
  costo_medio = 0;
  consultantCountInDataSource = 0;
  result= [];

  ngOnInit() {
  }

  private setSize() {
    this.elementStyle['height.px'] = this.flexLayoutContainerElement.nativeElement.offsetHeight;
    this.containerStyle['width.px'] = this.flexLayoutContainerElement.nativeElement.clientWidth;
  }

  onSelect(event) {
    console.log(event);
  }
  resolveData() {
    if (this.consultants && this.consultants.length !== this.consultantCountInDataSource) {
      this.consultantCountInDataSource = this.consultants.length;
      this.dataSource = [];
      this.result = [];
      this.costo_medio = 0;
      this.consultants.forEach(item => {
        if (item.incomingList) {
          item.incomingList.forEach(incoming => {
              const date = moment(incoming.referenceDate).format('MMM YYYY');
              const foundItem = this.dataSource.find(dataItem => dataItem.name === date);
              if (foundItem) {
                foundItem.series.push({
                  name: item.noUsuario,
                  value: incoming.netEarnings,
                  costo_medio: incoming.fixedCost
                });
            } else {
                this.dataSource.push({
                  name: date,
                  series: [{
                    name: item.noUsuario,
                    value: incoming.netEarnings,
                    costo_medio: incoming.fixedCost
                  }],
              });
            }});
        }
  });
      var costo = 0;
      var cant = 0;
      if (Object.keys(this.dataSource).length > 0) {
        this.dataSource.forEach(data => {
          data.series.forEach(serie => {
            costo += serie.costo_medio;
            cant++;
          })
        });
        this.costo_medio = costo / cant;
      }
      console.log("Costo Medio", this.costo_medio);
      this.result.push(this.dataSource);
      this.result.push(this.costo_medio);
      return this.result;
  }
    return this.result;
  }
}
