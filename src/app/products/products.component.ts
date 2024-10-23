import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos: any[] = []; // Cambiado de 'producto' a 'productos'
  newProduct = { nombre: '', precio: 0, descripcion: '' }; // Nuevo producto

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productos = data; // Cambiado de 'producto' a 'productos'
    });
  }

  // Método para agregar un producto
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(response => {
      console.log('Producto agregado:', response);
      this.productos.push(this.newProduct); // Agregar producto a la lista
      this.newProduct = { nombre: '', precio: 0, descripcion: '' }; // Limpiar formulario
    }, error => {
      console.error('Error al agregar el producto:', error);
    });
  }
}

