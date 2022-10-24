import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectstore';


  buscar(informacion: any){
    console.log("soy el padre");
    console.log(informacion);
  }
}
