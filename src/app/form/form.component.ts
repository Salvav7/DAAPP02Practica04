
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Empleado } from '../model/empleado';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  empleados: Empleado[] = [];
  empleado: Empleado = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.apiService.getData().subscribe(
      empleados => {
        this.empleados = empleados;
      },
      error => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

  guardarEmpleado(): void {
    if (!this.empleado.clave) {
      this.apiService.postData(this.empleado).subscribe(
        empleado => {
          console.log('Empleado creado correctamente', empleado);
          this.getEmpleados();
          this.resetEmpleado();
        },
        error => {
          console.error('Error al crear el empleado:', error);
        }
      );
    } else {
      this.apiService.putData(this.empleado.clave.toString(), this.empleado).subscribe(
        empleado => {
          console.log('Empleado actualizado correctamente', empleado);
          this.getEmpleados();
          this.resetEmpleado();
        },
        error => {
          console.error('Error al actualizar el empleado:', error);
        }
      );
    }
  }

  editarEmpleado(empleado: Empleado): void {
    this.empleado = { ...empleado }; // Clonar el objeto para evitar enlace bidireccional
  }

  eliminarEmpleado(clave: string): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.apiService.deleteData(clave).subscribe(
        () => {
          console.log('Empleado eliminado correctamente');
          this.getEmpleados();
          this.resetEmpleado();
        },
        error => {
          console.error('Error al eliminar el empleado:', error);
        }
      );
    }
  }

  resetEmpleado(): void {
    this.empleado = {};
  }
}