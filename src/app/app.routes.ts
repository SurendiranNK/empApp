import { Routes } from '@angular/router';
import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { EmployeeEditComponent } from './component/employee-edit/employee-edit.component';

export const routes: Routes = [
    { path: 'parent', component: EmployeeFormComponent }, // Ensure this exists
    { path: '', redirectTo: '/parent', pathMatch: 'full' }, // Example redirect
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'employee-form',
        component: EmployeeFormComponent
      }, {
        path: 'employee-edit',
        component: EmployeeEditComponent
      }
];
