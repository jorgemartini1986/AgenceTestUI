import { Component, Input, OnInit } from '@angular/core';
import { IncomingByDate } from '../../models/IncomingByDate';
import { IncomingDto } from '../../models/IncomingDto';
import * as moment from 'moment';

@Component({
  selector: 'app-consultant-info',
  templateUrl: './consultant-info.component.html',
  styleUrls: ['./consultant-info.component.scss']
})
export class ConsultantInfoComponent implements OnInit {

  displayedColumns: string[] = ['period', 'netEarnings', 'fixedCost', 'commission', 'benefit'];
  @Input() consultant: IncomingDto;
  data: IncomingByDate[];

  constructor() {
  }

  ngOnInit() {
    this.data = this.consultant ? this.consultant.incomingList : [] as IncomingByDate[];
  }

  /** Gets the total Earnings by consultant. */
  getTotalEarnings() {
    return this.consultant.incomingList.map(t => t.netEarnings).reduce((acc, value) => acc + value, 0);
  }

  /** Gets the total Fixed Cost by consultant. */
  getTotalFixedCost() {
    return this.consultant.incomingList.map(t => t.fixedCost).reduce((acc, value) => acc + value, 0);
  }

  /** Gets the total Commission by consultant. */
  getTotalCommission() {
    return this.consultant.incomingList.map(t => t.commission).reduce((acc, value) => acc + value, 0);
  }

  /** Gets the total Benefits by consultant. */
  getTotalBenefits() {
    return this.consultant.incomingList.map(t => t.benefit).reduce((acc, value) => acc + value, 0);
  }

  /** Gets a formated date. */
  getFormatedDate(date: Date) {
    return moment(date).format('MMMM YYYY');
  }
}
