// src/app/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isAdmin(): boolean {
    // Implement admin check logic here
    return true; // or false based on the actual logic
  }
}
