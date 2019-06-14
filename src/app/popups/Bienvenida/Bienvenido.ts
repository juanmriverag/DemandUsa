import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'Bienvenido',
  templateUrl: 'Bienvenido.html',
})
export class Bienvenido_modal {

  constructor(
    public dialogRef: MatDialogRef<Bienvenido_modal>,
    @Inject(MAT_DIALOG_DATA) public data: {
      Nombre: string;
    }) { }

  NombreF: string = this.data.Nombre.split(" ", 2)[0];
  Apellido: string = this.data.Nombre.split(" ", 2)[1];
  msn = "Bienvenido a ";
  msn2 = this.NombreF + " " + this.Apellido;
  salir(): void {
    this.dialogRef.close();
  }

}