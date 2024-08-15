import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit, OnDestroy {

  appointmentForm!: FormGroup;
  defaultData: any;

  destroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { dayI: number, hourI: number },
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.getDef()
    this.initForm()
    this.setDefaultVals()
  }

  getDef() {
    console.log(this.data)
    this.appointmentService.getAppointmentByDate(
      this.data.dayI,
      this.data.hourI
    ).pipe(
      takeUntil(this.destroy)
    ).subscribe(data => {
      this.defaultData = data
    })
  }

  initForm() {
    this.appointmentForm =
      new FormGroup({
        title: new FormControl(null, [Validators.required]),
        dayI: new FormControl(this.data.dayI),
        hourI: new FormControl(this.data.hourI)
      })
  }

  setDefaultVals() {
    if (this.defaultData) {
      this.appointmentForm.patchValue({
        title: this.defaultData.title
      })
    }
  }

  createOrEdit(form: FormGroup) {
    if (form.invalid) {
      return
    }

    if (this.defaultData) {
      this.appointmentService.editAppointment(
        this.defaultData.id,
        form.value
      )

    } else {
      this.appointmentService.addAppointment(form.value)
    }

    this.dialogRef.close();
  }

  delete() {
    this.appointmentService.deleteAppointment(this.defaultData.id);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
