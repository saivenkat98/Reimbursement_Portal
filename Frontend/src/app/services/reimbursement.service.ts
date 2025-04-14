import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReimbursementService {
  private apiUrl = `${environment.apiUrl}/api/Reimbursements`;

  constructor(private http: HttpClient) {}

  submitReimbursement(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
