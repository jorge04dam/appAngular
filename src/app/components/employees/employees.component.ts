import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Employee } from 'src/app/models/Employee';
import { EmpleadoService } from 'src/app/services/empleado.service';
import {MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';



const DATAEMPLOYEE: Employee[] = [
  {id:1, employeenumber: 123456, fullname: 'Jorge Agustin De Aquino', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:2, employeenumber: 123456, fullname: 'Jorge Eduardo Sanchez', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:3, employeenumber: 123456, fullname: 'America Alejandra Islas', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:4, employeenumber: 123456, fullname: 'Laura Nayely', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:5, employeenumber: 123456, fullname: 'Rosa Isaura', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:6, employeenumber: 123456, fullname: 'Paola Arroniz Gastaldi', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
  {id:7, employeenumber: 123456, fullname: 'Alonso Mauricio', dateofbirth: '10/10/2022', numbercellphone:5527361211, status:'1'},
];


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'employeenumber', 'fullname', 'dateofbirth','numbercellphone','status','editar','eliminar'];
  dataSource!: MatTableDataSource<Employee>;
  status: string = "";
  employeeStatus = new FormControl('');
  id:number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private aRoute: ActivatedRoute, private router: Router,private services:EmpleadoService,private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource(DATAEMPLOYEE);
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  ngOnInit(): void {
    this.getEmployee();
    
  }
  getEmployee(){
    this.services.getAll().subscribe(data=>{
      this.dataSource.data = data;
      
      
    })
  }
  mensaje(mensaje: string){
    this._snackBar.open('El empleado fue '+mensaje +' con exito.','OK',{
      duration:4000,
      horizontalPosition: 'right',
      
    });
  }
  
  disable(id: number){
    var status="";
    this.services.get(id).subscribe(data => {
      // console.log(data);
    status= data.status;
      
    if(status =="activo"){
       status = "inactivo";
    }else if(status == "inactivo"){
       status = "activo";
    }
    data.status= status;
    console.log(data);
    this.services.updateStatus(id, data).subscribe(data2=>{
      console.log(data2);
      
    })
    })
    
    
    //  this.router.navigate(['/employees']);
    var reloadd = document.getElementById('reload');
     location.reload();
     
  }

  eliminar(id: number) {
    console.log(id);
    this.services.delete(id).subscribe(() => {
     this.mensaje("borro");
     
     this.getEmployee();
    });    
  }
}
