import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IFSCResponse} from './models/ifsc-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  ifscForm: FormGroup;
  response: IFSCResponse;
  errorMessage;
  public show = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) {
  }

  get responseKeys() {
    return Object.keys(this.response);
  }

  ngOnInit(): void {
    this.ifscForm = this.formBuilder.group({
      ifsc: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{4}0[a-zA-Z0-9]{6}/)]]
    });
  }

  clearForm() {
    this.ifscForm.controls.ifsc.setValue('');
    this.show = !this.show;
  }

  formSubmit() {
    this.fetchDetails(this.ifscForm.controls.ifsc.value);
  }

  async fetchDetails(ifscCode) {
    try {
      this.show = true;
      this.response = await this.apiService.getDetails(ifscCode).toPromise();
      this.errorMessage = null;
      this.changeDetectorRef.markForCheck();
    } catch (e) {
      this.response = null;
      this.errorMessage = e.error;
      this.changeDetectorRef.markForCheck();
    }
    this.changeDetectorRef.detectChanges();
  }
}
