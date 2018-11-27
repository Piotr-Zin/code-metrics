import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.scss']
})
export class MainChartComponent implements OnInit, AfterViewInit {
  @ViewChild('mainChart')
  public baseChart: ElementRef;

  public datasets: any[] = [
    {
      data: [],
      label: 'NCLOC'
    }
  ];

  public labels: string[] = ['NCLOC'];

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    scaleShowHorizontalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 5000
          }
        }
      ]
    }
  };

  ncloc = '';

  sourceFiles: any[] = [];

  ncLocCalc = 0;

  // componentKey = 'piotrzin:universal-contacts';
  componentKey = 'io.spring.initializr:initializr';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.http
    //   .get<SqComponentResponse>(
    //     `http://localhost:9000/api/measures/component?component=${this.componentKey}&metricKeys=ncloc`
    //   )
    //   .subscribe(
    //     res => {
    //       this.ncloc = res.component.measures[0].value;
    //       this.initChart();
    //     },
    //     err => {
    //       console.error(err);
    //     }
    //   );
    // this.http
    //   .get(`http://localhost:9000/api/components/tree?component=${this.componentKey}&qualifiers=FIL`)
    //   .subscribe(res => {
    //     // this.sourceFiles = res.components.filter(file => file.language === 'java');
    //     this.sourceFiles = res.components;
    //     this.sourceFiles.forEach(sourceFile => {
    //       if (sourceFile.language !== 'java') {
    //         return;
    //       }
    //       this.http
    //         .get(
    //           `http://localhost:9000/api/measures/component?componentId=${sourceFile.id}&metricKeys=classes`
    //         )
    //         .pipe(delay(500))
    //         .subscribe(measure => {
    //           sourceFile.ncloc = measure.component.measures[0].value;
    //           this.ncLocCalc += +sourceFile.ncloc;
    //         });
    //     });
    //   });
  }

  initChart() {
    this.datasets = [{ data: [this.ncloc], label: 'NCLOC' }];
  }

  ngAfterViewInit() {}
}
