import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  jobForm: FormGroup;
  jobs: any[] = [];
  jobId: string | null = null;
  isTextVisible: boolean = false; // this is the toggle for add new job form

  toggleTextVisibility(): void {
    this.isTextVisible = !this.isTextVisible;
  }

  constructor(private fb: FormBuilder, private firebaseService: FirebaseService) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firebaseService.getJobs().subscribe(jobs => {
      this.jobs = jobs.map((job: any, index: number) => ({ id: index, ...job })); // Add id to each job
    });
  }

  addOrUpdateJob(): void {
    if (this.jobForm.invalid) {
      return;
    }

    if (this.jobId) {
      if (confirm('Are you sure you want to add this job?')) {
      this.firebaseService.updateJob(this.jobId, this.jobForm.value)
        .then(() => {
          this.clearForm();
        })
        .catch((error: any) => {
          console.error('Error updating job:', error);
        });
      }
    } else {
      this.firebaseService.addJob(this.jobForm.value)
        .then(() => {
          this.clearForm();
        })
        .catch((error: any) => {
          console.error('Error adding job:', error);
        });
    }
  }

  editJob(index: number, job: any): void {
    this.toggleTextVisibility();
    this.jobId = this.jobs[index].id;
    this.jobForm.patchValue(job);
  }

  deleteJob(index: number): void {
    const jobId = this.jobs[index].id;
    if (confirm('Are you sure you want to delete this job?')) {
      this.firebaseService.deleteJob(jobId)
        .then(() => {
          this.jobs.splice(index, 1); // Remove the job from the local array
        })
        .catch((error: any) => {
          console.error('Error deleting job:', error);
        });
    }
  }

  clearForm(): void {
    this.jobId = null;
    this.jobForm.reset();
  }
}
