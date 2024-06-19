import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { JobListComponent } from './job-list/job-list.component';
import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase-service.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    JobListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'job', component: JobListComponent },
      { path: '', redirectTo: '/job', pathMatch: 'full' }
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService,
    AdminGuard,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
