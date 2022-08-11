import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  submitted = false;

  projectForm = this.fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required]
  })

  constructor(public project: ProjectService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createProject(){
    this.submitted = true;
    if(this.projectForm.valid){
      this.project.createProject(this.projectForm.value).subscribe((res) => {
        console.log(res);
        this.project.showDialog = false;
      })
    }
  }

}
