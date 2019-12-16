import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IncomingDto } from './models/IncomingDto';

@Injectable({
  providedIn: 'root'
})

export class ConsultantService {
  constructor(protected http: HttpClient) { }

  getConsultants() {
    const url = environment.baseUrl + '/consultants/list?page=1';
    return this.http.get(url);
  }

  getConsultantIncoming(selectedConsultants: IncomingDto[], dateFrom: Date, dateTo: Date) {
    const url = environment.baseUrl + '/consultants/incoming';
    const items = {
      consultants: selectedConsultants,
      start: dateFrom,
      end: dateTo
    };

    return this.http.post(url, items);
  }
}
