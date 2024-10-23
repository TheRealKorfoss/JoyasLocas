import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html', // Aquí se define la plantilla
  styleUrls: ['./app.component.css'] // Asegúrate de usar 'styleUrls' (con 's')
})
export class AppComponent {
  title = 'paginawebdeverdad';
}

