import { Component } from '@angular/core';
import { SubmitFormComponent } from './submit-form/submit-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SubmitFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
