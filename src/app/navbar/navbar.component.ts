import { LoggerService } from './../services/logger/logger.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Component, OnInit } from '@angular/core';
import { CurrentProjectService } from '../services/current-project.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  project: string;

  constructor(
    private currentProjectService: CurrentProjectService,
    private localStorageService: LocalStorage,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    console.log('Navbar init!');
    this.currentProjectService.getCurrentProject().subscribe(
      proj => {
        if (proj) {
          this.logger.info(`Navbar getCurrentProject(): ${proj.name}`);

          this.project = proj.name;
        }
      },
      err => {
        this.logger.error(`Cannot retrieve current project: ${err}`);
      }
    );
  }
}
