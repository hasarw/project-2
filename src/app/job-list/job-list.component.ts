import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase-service.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs$: Observable<any[]>;
  filteredJobs: any[] = [];
  uniqueLocations: string[] = [];
  uniqueJobTitles: string[] = [];
  selectedLocation: string = '';
  selectedJobTitle: string = '';

  constructor(private firebaseService: FirebaseService) {
    this.jobs$ = this.firebaseService.getJobs();
  }

  ngOnInit(): void {
    this.jobs$.subscribe(jobs => {
      this.filteredJobs = jobs;
      this.uniqueLocations = [...new Set(jobs.map(job => job.location))];
      this.uniqueJobTitles = [...new Set(jobs.map(job => job.title))];
    });
  }

  filterJobs(): void {
    this.jobs$.subscribe(jobs => {
      this.filteredJobs = jobs.filter(job => {
        return (!this.selectedLocation || job.location === this.selectedLocation) &&
               (!this.selectedJobTitle || job.title === this.selectedJobTitle);
      });
    });
  }
}
