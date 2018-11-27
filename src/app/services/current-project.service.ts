import { SqComponent } from './../model/sq-component.model';
import { LoggerService } from './logger/logger.service';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class CurrentProjectService {
  currentProject: Subject<SqComponent> = new Subject<SqComponent>();

  /**
   * Returns current project as an observable
   */
  getCurrentProject(): Observable<SqComponent> {
    return this.currentProject.asObservable();
  }

  /**
   * Saves a new current project in the NGX local storage
   * @param project New SqComponent as a project
   */
  setCurrentProject(project: SqComponent): void {
    this.localStorageService.setItem('currentProject', project).subscribe(
      () => {
        this.logger.info(`Saved current project to local storage.`);
        this.currentProject.next(project);
      },
      () => {
        this.logger.error('Could not save current project to local storage.');
      }
    );
  }

  /**
   * Loads current project from NGX local storage
   */
  private loadCurrentProject(): void {
    this.localStorageService.getItem<SqComponent>('currentProject').subscribe(
      (proj: SqComponent) => {
        if (proj) {
          this.logger.info(`Loaded current project from local storage: ${proj.name}`);
          this.currentProject.next(proj);
        } else {
          this.logger.debug(`No current project present in local storage.`);
        }
      },
      error => {
        this.logger.error(`Error while loading current project: ${error}`);
      }
    );
  }

  constructor(private localStorageService: LocalStorage, private logger: LoggerService) {
    logger.info('CurrentProjectService created.');
    this.loadCurrentProject();
  }
}
