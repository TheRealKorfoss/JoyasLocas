import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Joyas locas'; // Propiedad que puede ser utilizada en la plantilla

  // Método para mostrar un mensaje en la consola
  greet() {
    console.log('¡Bienvenido a la aplicación!');
  }
}


