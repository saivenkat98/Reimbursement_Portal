import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReimbursementService } from '../services/reimbursement.service';
import { CustomValidators } from './custom-validators';


@Component({
  selector: 'app-submit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent {
  reimbursementForm: FormGroup;
  fileToUpload: File | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private reimbursementService: ReimbursementService) {
    this.reimbursementForm = this.fb.group({
      Title: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(50)]],
      Amount: ['', [Validators.required, Validators.min(0.01)]],
      Date: ['', [Validators.required, CustomValidators.pastDate()]]
    });
  }

  handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  
      if (file.size > maxSizeInBytes) {
        this.errorMessage = 'File size must be less than 5 MB.';
        this.fileToUpload = null;
        input.value = ''; // Clear the file input visually
      } else {
        this.errorMessage = ''; // Clear previous error
        this.fileToUpload = file;
      }
    }
  }
  

  onSubmit(fileInput: HTMLInputElement) {
    if (this.reimbursementForm.valid && this.fileToUpload) {
      const formData = new FormData();
      formData.append('Title', this.reimbursementForm.get('Title')?.value);
      formData.append('Description', this.reimbursementForm.get('Description')?.value);
      formData.append('Amount', this.reimbursementForm.get('Amount')?.value);
      formData.append('Date', this.reimbursementForm.get('Date')?.value);
      formData.append('Receipt', this.fileToUpload);
  
      this.reimbursementService.submitReimbursement(formData).subscribe({
        next: () => {
          this.successMessage = 'Reimbursement submitted successfully!';
          this.errorMessage = '';
          this.reimbursementForm.reset();
          this.fileToUpload = null;
  
          // ✅ clear file input box
          fileInput.value = '';
        },
        error: () => {
          this.errorMessage = 'Submission failed. Try again.';
          this.successMessage = '';
        }
      });
    }
  }
  
}