import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './component/project/create-project/create-project.component';
import { DetailProjectComponent } from './component/project/detail-project/detail-project.component';
import { ProjectComponent } from './component/project/project.component';

const routes: Routes = [
  {path: 'project', component: ProjectComponent},
  {path: 'project/:id/details', component: DetailProjectComponent},
  {path: 'create', component: CreateProjectComponent},
  {path: '', redirectTo: 'project', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
