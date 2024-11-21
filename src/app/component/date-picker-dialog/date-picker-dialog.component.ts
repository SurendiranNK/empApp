import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS ,} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS ,MAT_DATE_LOCALE
 } from '@angular/material/core';
import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-date-picker-dialog',
  standalone: true,
  imports: [MatInputModule,MatDialogModule,MatDatepickerModule,MatCardModule,MatButtonModule,MatNativeDateModule,MatFormFieldModule,FormsModule,CommonModule],
  templateUrl: './date-picker-dialog.component.html',
  styleUrl: './date-picker-dialog.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatePickerDialogComponent implements OnInit   
{
  selectedDate: Date = new Date(); // Initialize with today's date
  selectedButton: number | null = null;
  // Disable all past dates
  disablePastDates = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date >= today;
  };

  constructor(public dialogRef: MatDialogRef<DatePickerDialogComponent>,private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.selectedDate = new Date(data);
    this.dateAdapter.setLocale('en-US'); // Set locale to English (US)
   }

  ngOnInit() {
    
        this.selectedDate = new Date();
        
  }
  isDateValid(date: any): boolean {
    
    return date instanceof Date && !isNaN(date.getTime());

  }

  onDateChange(event: any) {
      this.selectedDate = event.value;
    
  }

  selectToday() {
    this.selectedDate = new Date();
  }

  selectNextMonday() {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 1 : 8 - day;
    this.selectedDate = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
  }

  selectNextTuesday() {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 1 ? 1 : 8 - day;
    this.selectedDate = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
  }

  selectAfterOneWeek() {
    const now = new Date();
    this.selectedDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  }


  onButtonClick(index: number): void {
    this.selectedButton = index;
    switch (index) {
      case 1:
        this.selectedDate = new Date();
        break;

      case 2:
        // this.selectedButton = this.selectedButton === 2 ? null : 2;
        const now = new Date();
        const day = now.getDay();
        const diff = day === 0 ? 1 : 8 - day;
        this.selectedDate = new Date(now.getTime() + diff * 24 * 60 * 60 * 1000);
        break;

      case 3:
        // this.selectedButton = this.selectedButton === 3 ? null : 3;
        const now_ = new Date();
        const day_ = now_.getDay();
        const diff_ = day_ === 1 ? 1 : 8 - day_;
      this.selectedDate = new Date(now_.getTime() + diff_ * 24 * 60 * 60 * 1000);
        break;

      case 4:
        // Logic for Button 4
        // this.selectedButton = this.selectedButton === 4 ? null : 4;
        const now__ = new Date();
        this.selectedDate = new Date(now__.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;

      default:
        // Default case if needed
        break;
    }

    
  }

  save() {
    this.dialogRef.close(this.selectedDate);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  get safeSelectedDate(): Date {
    return this.selectedDate || new Date(); // Fallback to today's date
  }
}
