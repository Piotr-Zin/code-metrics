import { SqComponentResponse } from './../model/sq-response.model';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { SqProjectDetails } from './../model/sq-project-details.model';
import { SqProjectMetrics } from './../model/sq-project-metrics.model';
import { SqAnalyses } from './../model/sq-analyses.model';
import { SqHttpService } from './../services/http/sq-http.service';
import { CodeMetricsService } from './../services/code-metrics.service';
import { SqComponent } from './../model/sq-component.model';
import { LoggerService } from './../services/logger/logger.service';
import { Component, OnInit } from '@angular/core';
import { CurrentProjectService } from '../services/current-project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: SqComponent;

  projectDetails: SqProjectDetails = new SqProjectDetails();

  analysed = false;

  constructor(
    private currentProjectService: CurrentProjectService,
    private codeMetricsService: CodeMetricsService,
    private http: SqHttpService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    console.log('Project details init!');

    // this.currentProjectService.getCurrentProject().subscribe((currentProject: SqComponent) => {
    //   if (!currentProject) {
    //     throw new Error('Current project is not defined!');
    //   }
    //   this.logger.info(`Project details getCurrentProject(): ${currentProject.name}`);
    //   this.project = currentProject;

    //   this.codeMetricsService.getLastAnalysisDate().subscribe(analyses => {
    //     this.logger.info(`Analyses: ${JSON.stringify(analyses.analyses.reverse().slice(-1)[0])}`);
    //     this.projectDetails.lastAnalysisDate = analyses.analyses.reverse().slice(-1)[0].date;
    //   });
    // });

    this.currentProjectService
      .getCurrentProject()
      .pipe(
        switchMap((currentProject: SqComponent) => {
          if (!currentProject) {
            throw new Error('Current project is not defined!');
          }
          this.logger.info(`Project details getCurrentProject(): ${currentProject.name}`);
          this.project = currentProject;

          return this.codeMetricsService.getLastAnalysisDate(this.project.project);
        })
      )
      .subscribe((analyses: any[]) => {
        this.logger.info(`Analyses: ${JSON.stringify(analyses.analyses.reverse().slice(-1)[0].date)}`);
        this.projectDetails.lastAnalysisDate = analyses.analyses.reverse().slice(-1)[0].date;
      });
  }

  showMetrics() {
    this.codeMetricsService.getProjectMetrics(this.project.project).subscribe(
      (p: SqComponentResponse) => {
        this.logger.info(`Successfully fetched project metrics: ${JSON.stringify(p)}`);
        const result = new SqProjectMetrics();
        p.component.measures.forEach(element => {
          this.logger.info(
            `element: ${element.metric}: ${element.value}, key: ${SqProjectMetrics.METRIC_MAP[element.metric]}`
          );
          Object.defineProperty(result, SqProjectMetrics.METRIC_MAP[element.metric], {
            value: element.value,
            enumerable: true
          });
        });
        Object.assign(this.projectDetails.projectMetrics, result);

        this.logger.info(`entries: ${JSON.stringify(Object.entries(this.projectDetails.projectMetrics))}`);
        this.logger.info(`projectMetrics: ${JSON.stringify(this.projectDetails.projectMetrics)}`);
        this.analysed = true;
      },
      err => this.logger.error(err)
    );
  }
}
