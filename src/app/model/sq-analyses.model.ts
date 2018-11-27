import { SqAnalysis } from './sq-analysis.model';
import { SqPageable } from './sq-pageable.model';
export interface SqAnalyses {
  analyses: SqAnalysis[];
  paging: SqPageable;
}
