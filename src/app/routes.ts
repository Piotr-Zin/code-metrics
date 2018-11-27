import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectSelectionComponent } from './project-selection/project-selection.component';

export const routes = [
  {
    path: 'home',
    component: ProjectSelectionComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'project-details',
    component: ProjectDetailsComponent
  },
  { path: '**', redirectTo: '' }
];
