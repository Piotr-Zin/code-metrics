import { SqPageable } from './sq-pageable.model';
import { SqComponent } from './sq-component.model';

export interface SqPagedComponents {
  paging: SqPageable;
  components: SqComponent[];
}
