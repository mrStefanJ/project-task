import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Project, Task } from '../models/project.model';
import { Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private Project_Root = 'http://localhost:3000/project';
  private Task_Root = 'http://localhost:3000/task';

  showDialog = false;

  constructor(
    private http: HttpClient
  ) { }

  private _refreshProjectList$ = new Subject<void>();

  get refreshProjectList() {
    return this._refreshProjectList$;
  }

  listProject() {
    return this.http.get<Project[]>(`${this.Project_Root}`).pipe(catchError(this.handleError));
  }

  createProject(project: Project) {
    return this.http.post(`${this.Project_Root}`, project).pipe(tap(() => {
      this._refreshProjectList$.next();
    }));
  }

  getProjectById(id: number) {
    return this.http.get<Project>(`${this.Project_Root}/` + id);
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.Task_Root}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened. PLease try again later.');
  }
}
