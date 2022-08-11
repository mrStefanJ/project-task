import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  allProject$!: Observable<Project[]>;

  constructor(
    public project: ProjectService
  ) { }

  ngOnInit(): void {
    this.project.refreshProjectList.subscribe(() => {
      this.loadProject();
    })
    this.loadProject();
  }

  loadProject() {
    this.allProject$ = this.project.listProject();
  }

}
