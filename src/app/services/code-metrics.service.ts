import { SqComponentResponse } from './../model/sq-response.model';
import { SqProjectMetrics } from './../model/sq-project-metrics.model';
import { LoggerService } from './logger/logger.service';
import { SqComponent } from './../model/sq-component.model';
import { SqHttpService } from './http/sq-http.service';
import { SqPagedComponents } from '../model/sq-paged-components.model';
import { CurrentProjectService } from './current-project.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CodeMetricsService {
  constructor(
    private currentProjectService: CurrentProjectService,
    private http: SqHttpService,
    private logger: LoggerService
  ) {}

  private currentProject: SqComponent;

  public getProjectsList(): Observable<SqPagedComponents> {
    // return this.http.get('/components/search_projects?ps=50&f=analysisDate');
    return this.http.get(`/components/search?qualifiers=TRK`);
  }

  getLastAnalysisDate(): Observable<any> {
    return this.currentProjectService.getCurrentProject().pipe(
      mergeMap((proj, _) => {
        this.logger.info(`CodeMetricsService:getLastAnalysisDate() => Current project: ${JSON.stringify(proj)}`);
        return this.http.get<any>(`/project_analyses/search?project=${proj.project}&ps=3`);
      })
    );
  }

  // getProjectMetrics(): Observable<SqComponentResponse> {
  //   return this.currentProjectService.getCurrentProject().pipe(
  //     concatMap((proj, _) => {
  //       this.logger.info(`CodeMetricsService:getProjectMetrics() => Current project: ${JSON.stringify(proj)}`);
  //       const metrics = SqProjectMetrics.METRIC_LIST.join(',');
  //       this.logger.info(`metrics: ${metrics}`);
  //       return this.http.get<SqComponentResponse>(
  //         `/measures/component?component=${proj.project}&metricKeys=${metrics}`
  //       );
  //     })
  //   );
  // }

  getProjectMetrics(currentProjectKey: string): Observable<SqComponentResponse> {
    const metrics = SqProjectMetrics.METRIC_LIST.join(',');
    this.logger.info(`metrics: ${metrics}`);
    return this.http.get<SqComponentResponse>(
      `/measures/component?component=${currentProjectKey}&metricKeys=${metrics}`
    );
  }
}
