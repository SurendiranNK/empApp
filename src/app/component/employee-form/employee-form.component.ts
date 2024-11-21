import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import * as moment from 'moment';
import moment from 'moment';
import { Router } from '@angular/router';

interface Employee {
  id?: number; // Optional, as IndexedDB generates it
  name: string;
  role: string;
  // department: string;
  dateOfJoining: string;
  dateOfLeaving: string;
}



@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule ,MatFormFieldModule,MatInputModule,ReactiveFormsModule,MatCardModule,FormsModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  constructor(public employeeService: EmployeeService,public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,private router:Router
  ) {}


  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    dateOfJoining: new FormControl(new Date(), Validators.required),
    dateOfLeaving: new FormControl(new Date())
  });


  employee: Employee = {
    name: '',
    role: '',
    dateOfJoining: '',
    dateOfLeaving: ''
  
  };
  
  ngOnInit(): void {
    //this.employeeService.fetchEmployees();
    // const date = moment();  // This gets the current date
    // const formattedDate = date.format('DD MMM YYYY');
    // console.log(formattedDate);
    // const today = moment();  // Get today's date
    // const formattedDate = today.format('DD MMM YYYY');  // Format the date
    // setTimeout(() => {
    //   // Updating the date values
    //   this.employee.dateOfJoining = formattedDate;
    //   this.employee.dateOfLeaving = formattedDate;
    //   this.cdRef.detectChanges();  // Manually trigger change detection
    // }, 1000); // Example of delay
  }

  onSubmit() {
    if (this.myForm.valid) {


      if(this.employee.dateOfLeaving!==''){
        const startDate = moment(this.employee.dateOfJoining, 'DD MMM YYYY');
        const endDate = moment(this.employee.dateOfLeaving, 'DD MMM YYYY');
    
        // Compare the dates
        if (startDate.isAfter(endDate)) {
          alert('Leaving Date is after joining Date');
          return
        } 
      }

     
      
      this.employeeService.addEmployee(this.employee).then(() => {
        alert('Employee Information added successfully!');
        this.resetForm();
        this.cdRef.detectChanges();
      });
    }else{
      if(this.employee.name===''){
        alert('Please enter your name')
      }else if (this.employee.role===''){
        alert('Please select your role')
      }else if (this.employee.dateOfJoining===''){
          alert('Please enter your date of Joining')
      }
    }
   
  }
  

  openDatePickerDialog(type:number) {
    
    let selected_Date = ""
    if(type==1){
      selected_Date = this.employee.dateOfJoining?this.employee.dateOfJoining:''
    }else{
      selected_Date = this.employee.dateOfLeaving?this.employee.dateOfLeaving:''
    }
     
    const dialogRef = this.dialog.open(DatePickerDialogComponent, {
      data: selected_Date
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('Selected date:', result);

        const date = moment(result);  // Create Moment object from string
        const formattedDate = date.format('DD MMM YYYY');

        if(type==1){
          this.employee.dateOfJoining=formattedDate
        }else{
          this.employee.dateOfLeaving=formattedDate
        }
        this.cdRef.detectChanges();
      }


      
      if(result == null){
        if(type==1){
          this.employee.dateOfJoining=''
        }else{
          this.employee.dateOfLeaving=''
        }
      }
    });
    
  }
  cancel(){
    this.router.navigate(['/employee-list']);  // Navigate to the edit form
  }


  resetForm() {
    this.employee = {
      name: '',
      role: '',
      dateOfJoining: '',
      dateOfLeaving: ''
  
    };
  }

}
