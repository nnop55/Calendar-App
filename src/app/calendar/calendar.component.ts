import { Component, inject, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from './services/appointment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarService = inject(CalendarService)
  appointmentService = inject(AppointmentService)
  dialog = inject(MatDialog)

  appointments$!: Observable<any[]>;

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAllAppointments();
  }

  get calendar() {
    return this.calendarService.calendar
  }

  onCellClick(dayI: number, hourI: number) {
    this.dialog.open(AppointmentDialogComponent, {
      data: {
        dayI,
        hourI
      },
      width: '350px'
    });
  }


  drop(event: any) {
    this.appointmentService.drop(event)
  }
}
