import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { uuidv4 } from 'src/app/shared/utils/uuid';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsData: BehaviorSubject<any[]>;

  constructor() {
    this.appointmentsData = new BehaviorSubject<any[]>(this.getDataFromStorage());
  }

  getAllAppointments(): Observable<any[]> {
    return this.appointmentsData.asObservable();
  }

  getAppointmentById(id: string): Observable<any | undefined> {
    return this.appointmentsData.pipe(
      map(appointments => appointments.find(o => o.id === id))
    );
  }

  getAppointmentByDate(dayI: number, hourI: number): Observable<any | undefined> {
    return this.appointmentsData.pipe(
      map(appointments => appointments.find(o => o.dayI === dayI && o.hourI === hourI))
    );
  }

  addAppointment(appointment: any) {
    const currentAppointments = this.appointmentsData.getValue();
    const newAppointment = {
      id: uuidv4(),
      ...appointment
    };
    this.appointmentsData.next([...currentAppointments, newAppointment]);

    this.renewLocalstorage();
  }

  deleteAppointment(id: string) {
    const updatedAppointments = this.appointmentsData
      .getValue()
      .filter(appointment => appointment.id !== id);

    this.appointmentsData.next(updatedAppointments);
    this.renewLocalstorage();
  }

  editAppointment(id: string, updatedAppointment: any) {
    const currentAppointments = this.appointmentsData.getValue();
    const index = currentAppointments.findIndex(appointment => appointment.id === id);

    if (index !== -1) {
      currentAppointments[index] = {
        ...currentAppointments[index],
        ...updatedAppointment
      };
      this.appointmentsData.next([...currentAppointments]);
      this.renewLocalstorage();
    }
  }

  drop(event: any) {
    let t = event.event.target as HTMLElement;
    if (t.querySelector("p")?.innerText.length) {
      return;
    }

    const updatedAppointments = this.appointmentsData.getValue();
    const draggedItem = event.item.data;

    if (t.getAttribute("dayIndex")) {
      draggedItem.dayI = +t.getAttribute("dayIndex")!;
    }
    if (t.getAttribute("hourIndex")) {
      draggedItem.hourI = +t.getAttribute("hourIndex")!;
    }

    this.appointmentsData.next([...updatedAppointments]);
    this.renewLocalstorage();
  }

  private renewLocalstorage() {
    const data = JSON.stringify(this.appointmentsData.getValue());
    localStorage.setItem("TM-CALENDAR-DATA", data);
  }

  private getDataFromStorage() {
    const data = localStorage.getItem("TM-CALENDAR-DATA");
    return data ? JSON.parse(data) : [];
  }
}
