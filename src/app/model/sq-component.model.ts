import { SqMeasure } from './sq-measure.model';

export interface SqComponent {
  id: string;
  key: string;
  name: string;
  organization?: string;
  visibility?: string;
  description?: string;
  qualifier: string;
  project?: string;
  measures?: SqMeasure[];
}
