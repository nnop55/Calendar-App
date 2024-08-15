import { FormControl } from "@angular/forms"

export type AppointmentForm = {
    title: FormControl<string | null>,
    date: FormControl<Date | null>,
    dayI: FormControl<number | null>,
    hourI: FormControl<number | null>
}