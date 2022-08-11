import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ProjectService } from 'src/app/service/project.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {

  id!: number;
  task: any = [];
  projectT: any;
  newTaskList: any = [];

  taskDetail = false;
  buttonName:any = 'Show'; 
  message = '';

  constructor(private project: ProjectService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getTask();
  }

  getTask(){
    forkJoin([
      this.projectT = this.project.getProjectById(this.id),
      this.task = this.project.getAllTasks()
    ]).subscribe({
      next: res => {
        console.log(res);
        if(res[0].taskList.length > 0){
          this.newTaskList = res[1].filter((task) => 
          res[0].taskList.includes(task.id)
        );
        } else{
          this.message = 'Ther are no tasks'
        }
        
        console.log(this.newTaskList);
      }, error: () => {
        
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
