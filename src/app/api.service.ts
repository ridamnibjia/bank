import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IFSCResponse} from './models/ifsc-response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'https://ifsc.razorpay.com/';

  constructor(private httpClient: HttpClient) {

  }

  getDetails(ifscCode: string): Observable<IFSCResponse> {
    return this.httpClient.get<IFSCResponse>(`${this.baseUrl}${ifscCode}`);
  }
}
