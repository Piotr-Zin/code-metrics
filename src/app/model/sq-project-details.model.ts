import { SqProjectMetrics } from './sq-project-metrics.model';
export class SqProjectDetails {
  lastAnalysisDate: string;
  projectMetrics: SqProjectMetrics = new SqProjectMetrics();
}
