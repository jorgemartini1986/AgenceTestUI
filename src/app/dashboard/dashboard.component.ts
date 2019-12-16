import { Component, OnInit } from '@angular/core';
import { ConsultantService } from '../consultant.service';
import { IncomingDto } from '../models/IncomingDto';
import { finalize } from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  toppings = new FormControl();

  consultants: IncomingDto[];
  selectedConsultants: IncomingDto[] = [];
  loadingIncomings = false;
  loadingConsultants = false;
  consultantIncomings: IncomingDto[];
  dateFrom = new Date(2005, 0,1);
  dateTo = new Date(2019, 11,  13);

  constructor(protected consultantService: ConsultantService) {
  }

  ngOnInit(): void {
    this.getConsultants();
  }

  getConsultants() {
    this.loadingConsultants = true;
    this.consultantService.getConsultants().pipe(
      finalize(() => {
        this.loadingConsultants = false;
      })
    ).subscribe(
      data => {
        // Success
        this.consultants = data['items'];
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  getConsultantIncoming() {
    this.loadingIncomings = true;

    this.consultantService.getConsultantIncoming(this.selectedConsultants, this.dateFrom, this.dateTo).pipe(
      finalize(() => {
        this.loadingIncomings = false;
      })
    )
      .subscribe(
        data => {
          // Success
          this.consultantIncomings = data['items'];
          console.log(data);
        },
        error => {
          console.error(error);
        }
      );
  }

  onSelectionChange() {
    this.getConsultantIncoming();
  }
  onDateFromChanged(event) {
    this.dateFrom = event.value;
    this.getConsultantIncoming();
  }

  onDateToChanged(event) {
    this.dateTo = event.value;
    this.getConsultantIncoming();
  }


}
