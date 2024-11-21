import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';

interface Employee {
  id?: number;
  name: string;
  role: string;
  // department: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  swiped: boolean

}


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,MatListModule,HammerModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent  implements OnInit {
  employees: Employee[] = [];
  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];


  constructor(private employeeService: EmployeeService,private router:Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Fetch employees from the service and update the list
  async loadEmployees() {
    try {
      
      this.employees = await this.employeeService.getAllEmployees();

      this.employees = this.employees.map(employee => {
        return { ...employee, swiped: false };
      });

      this.currentEmployees = this.employees.filter(emp => !emp.dateOfLeaving);
      this.previousEmployees = this.employees.filter(emp => emp.dateOfLeaving);
    } catch (error) {
      console.error('Error loading employees', error);
    }
  }
  redirectToAnotherRoute() {
    this.router.navigate(['/employee-form']); // Specify the desired route
  }
  // Delete an employee from the list
  async deleteEmployee(employee: Employee) {
    try {
      await this.employeeService.deleteEmployee(employee.id!);
      this.loadEmployees();  // Refresh the list
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  }
  editEmployee(employee: Employee): void {
    this.employeeService.setEmployee(employee); // Share the employee data
    this.router.navigate(['/employee-edit']);  // Navigate to the edit form
  }

  onSwipeLeft(employee: Employee) {
    employee.swiped = true;
  }

  onSwipeRight(employee: Employee) {
    employee.swiped = false;
  }

}
