import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { EmployeesComponent } from 'EmployeesComponent';
import { EmployeesComponent} from './components/employees/employees.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  {path: 'employees', component:EmployeesComponent},
  {path: 'employees/new', component:FormComponent},
  {path: 'employees/edit/:id', component:FormComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
