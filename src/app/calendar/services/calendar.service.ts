import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendar: any = {
    hours: [
      { value: '1 AM' }, { value: '2 AM' }, { value: '3 AM' },
      { value: '4 AM' }, { value: '5 AM' }, { value: '6 AM' },
      { value: '7 AM' }, { value: '8 AM' }, { value: '9 AM' },
      { value: '10 AM' }, { value: '11 AM' }, { value: '12 PM' },
      { value: '1 PM' }, { value: '2 PM' }, { value: '3 PM' },
      { value: '4 PM' }, { value: '5 PM' }, { value: '6 PM' },
      { value: '7 PM' }, { value: '8 PM' }, { value: '9 PM' },
      { value: '10 PM' }, { value: '11 PM' }
    ],
    days: [
      { value: "Monday" },
      { value: "Tuesday" },
      { value: "Wednesday" },
      { value: "Thursday" },
      { value: "Friday" },
      { value: "Saturday" },
      { value: "Sunday" },
    ]
  }


  constructor() {
  }

}
