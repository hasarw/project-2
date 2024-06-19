// src/app/firebase-service.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase) {}

  getJobs(): Observable<any[]> {
    return this.db.list('/jobs').valueChanges();
  }

  addJob(job: any): Promise<void> {
    return this.db.list('/jobs').push(job)
      .then(() => {});
  }

  updateJob(id: string, job: any): Promise<void> {
    return this.db.object(`/jobs/${id}`).update(job);
  }

  deleteJob(id: string): Promise<void> {
    return this.db.object(`/jobs/${id}`).remove();
  }
}
