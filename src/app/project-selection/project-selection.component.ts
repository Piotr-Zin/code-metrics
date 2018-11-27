import { mergeMap } from 'rxjs/operators';
import { SqHttpService } from './../services/http/sq-http.service';
import { Component, OnInit } from '@angular/core';
import { CodeMetricsService } from '../services/code-metrics.service';
import { SqComponent } from '../model/sq-component.model';
import { CurrentProjectService } from '../services/current-project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-selection',
  templateUrl: './project-selection.component.html',
  styleUrls: ['./project-selection.component.scss']
})
export class ProjectSelectionComponent implements OnInit {
  components: SqComponent[];
  selectedProject: SqComponent;

  constructor(
    private codeMetricsService: CodeMetricsService,
    private currentProjectService: CurrentProjectService,
    private http: SqHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.codeMetricsService.getProjectsList().subscribe(res => {
      this.components = res.components;
    });
  }

  selectProject($event) {
    if (!this.selectedProject) {
      $event.preventDefault();
      return;
    }

    this.currentProjectService.setCurrentProject(this.selectedProject);
    this.router.navigate(['/project-details']);
  }
}
