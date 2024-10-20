import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component'; // Asegúrate de la ruta correcta

@NgModule({
  imports: [
    CommonModule,
    OrdersComponent // Aquí lo importas
  ],
  exports: [
    OrdersComponent // Si necesitas usarlo en otros módulos
  ]
})
export class SomeModule { }

