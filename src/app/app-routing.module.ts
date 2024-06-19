import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';



const routes: Routes = [
  { path: '', component: JobListComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'job', component: JobListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
