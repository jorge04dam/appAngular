import { outputAst } from '@angular/compiler';
import { Component, OnInit, NgModule, Output, EventEmitter } from '@angular/core';
import {MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from 'src/app/models/Employee';
import { EmployeesComponent } from '../employees/employees.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FormControl} from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';



interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  
})
export class FormComponent implements OnInit {
  @Output() informacionEmpleado = new EventEmitter<any>() 
  id: number;
  operacion: String = "Agregar";
  boton:String ="addEmployee()";
  

  employeeNumber = new FormControl('', [Validators.required]);
  employeeName = new FormControl('', [Validators.required]);
  employeeNumberPhone = new FormControl('', [Validators.required]);
  employeeDateBirth = new FormControl('', [Validators.required]);
  employeeStatus = new FormControl('', [Validators.required]);


  constructor(private aRoute: ActivatedRoute, private router: Router,private _snackBar: MatSnackBar,private _formBuilder: FormBuilder, private services:EmpleadoService) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  }
 

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar';
      this.boton = 'edit()';
      
      this.getEmployee(this.id);
    }

  }
  
  
  
  mensaje(mensaje: string){
    this._snackBar.open('El empleado fue '+mensaje +' con exito.','OK',{
      duration:4000,
      horizontalPosition: 'right',
      
    });
  }

  getEmployee(id: number){
    
    this.services.get(id).subscribe(data => {
      console.log(data);
      this.employeeNumber= new FormControl(data.employeenumber);
      this.employeeName= new FormControl(data.fullname);
      this.employeeNumberPhone= new FormControl(data.numbercellphone);
      this.employeeDateBirth= new FormControl(data.dateofbirth);
      this.employeeStatus= new FormControl(data.status);
      
      
    })
  }
  edit() {
    
    const newEmployee:Employee= {
      employeenumber: Number(this.employeeNumber.value), 
      fullname: String(this.employeeName.value),
      numbercellphone: Number(this.employeeNumberPhone.value),
      dateofbirth: String(this.employeeDateBirth.value),
      status: String(this.employeeStatus.value)
    }

    if(this.id != 0) {
      newEmployee.id = this.id;
      this.editEmployee(this.id, newEmployee);
      
    } else {
      this.addEmployee();
      
    }
  }
  editEmployee(id: number, employee: Employee) {
    
    this.services.update(id, employee).subscribe(() => {      
      this.mensaje("editado");
      this.router.navigate(['/employees']);
    })
  }
  addEmployee(){
    
    const newEmployee:Employee= {
      employeenumber: Number(this.employeeNumber.value), 
      fullname: String(this.employeeName.value),
      numbercellphone: Number(this.employeeNumberPhone.value),
      dateofbirth: String(this.employeeDateBirth.value),
      status: String(this.employeeStatus.value)
    }
    

    if(newEmployee.fullname =="" || newEmployee.employeenumber ==0 || 
    newEmployee.numbercellphone ==0 || newEmployee.dateofbirth =="" ){
      this._snackBar.open('Debe llenar todos los campos.','',{
        duration:4000,
        horizontalPosition: 'right',
        
      });
    }else{
      this.services.create(newEmployee).subscribe(data=>{
        this.mensaje("agregado");
        this.router.navigate(['/employees']);
      });
    }
    
  }
  
}
