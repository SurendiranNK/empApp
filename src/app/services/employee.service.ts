import { signal, Signal } from '@angular/core';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { openDB, IDBPDatabase } from 'idb';
import { BehaviorSubject } from 'rxjs';


// interface Employee {
//   id: number;
//   name: string;
//   position: string;
//   department: string;
//   dateOfJoining: string;
// }
interface Employee {
  id?: number;  // Optional, as IndexedDB generates it
  name: string;
  role: string;
  // department: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  swiped: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private dbPromise!: Promise<IDBPDatabase>;
  employees = signal<Employee[]>([]);
  private selectedEmployee = new BehaviorSubject<Employee | null>(null);

  setEmployee(employee: Employee): void {
    this.selectedEmployee.next(employee);
  }

  getEmployee() {
    return this.selectedEmployee.asObservable();
  }
  // constructor() {
  //   this.initializeDatabase();
    
  // }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initDB();
    }
  }


  private initDB() {
    this.dbPromise = openDB('EmployeeDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('employees')) {
          db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }
  // Initialize IndexedDB
  private async initializeDatabase() {
    this.dbPromise = openDB('empDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('employees')) {
          db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async fetchEmployees() {
    // const allEmployees = await this.getAllEmployees();
    // this.employees.set(allEmployees);
  }

  // Add Employee
  async addEmployee(employee: any) {
    const db = await this.dbPromise;
    await db.add('employees', employee);
  }

  // Get All Employees
  async getAllEmployees(): Promise<Employee[]> {
    const db = await this.dbPromise;
    return db.getAll('employees');
    
  }

  // Update Employee
  async updateEmployee(employee: Employee) {
    const db = await this.dbPromise;
    await db.put('employees', employee);
  }

  // Delete Employee
  async deleteEmployee(id: number) {
    const db = await this.dbPromise;
    await db.delete('employees', id);
  }
}


// import { Injectable } from '@angular/core';
// import { openDB, IDBPDatabase } from 'idb';

// interface Employee {
//   id: number;
//   name: string;
//   position: string;
//   department: string;
//   dateOfJoining: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class EmployeeService {
//   private dbPromise: Promise<IDBPDatabase> | null = null;

//   constructor() {
//     this.initDB();
//   }

//   private async initDB() {
//     try {
//       this.dbPromise = openDB('EmployeeDB', 1, {
//         upgrade(db) {
//           if (!db.objectStoreNames.contains('employees')) {
//             db.createObjectStore('employees', { keyPath: 'id', autoIncrement: true });
//           }
//         },
//       });
//       console.log('IndexedDB initialized successfully.');
//     } catch (error) {
//       console.error('Error initializing IndexedDB', error);
//     }
//   }

//   async getAllEmployees(): Promise<Employee[]> {
//     if (!this.dbPromise) {
//       console.error('Database not initialized');
//       return [];
//     }

//     const db = await this.dbPromise;
//     return db.getAll('employees');
//   }

//   async addEmployee(employee: Employee): Promise<void> {
//     if (!this.dbPromise) {
//       console.error('Database not initialized');
//       return;
//     }

//     const db = await this.dbPromise;
//     await db.add('employees', employee);
//   }

//   async updateEmployee(employee: Employee): Promise<void> {
//     if (!this.dbPromise) {
//       console.error('Database not initialized');
//       return;
//     }

//     const db = await this.dbPromise;
//     await db.put('employees', employee);
//   }

//   async deleteEmployee(id: number): Promise<void> {
//     if (!this.dbPromise) {
//       console.error('Database not initialized');
//       return;
//     }

//     const db = await this.dbPromise;
//     await db.delete('employees', id);
//   }
// }
