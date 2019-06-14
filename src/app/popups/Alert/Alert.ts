import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'Alert',
    templateUrl: 'Alert.html',
  })
  export class Alert_modal {
  
    constructor(
      public dialogRef: MatDialogRef<Alert_modal>,
      @Inject(MAT_DIALOG_DATA) public data: {
        title: string;
        textContent : string;
        ok: string;
      }) {}
  
    //   NombreF : string =  this.data.Nombre.split(" ", 2)[0];
    //   Apellido : string =  this.data.Nombre.split(" ", 2)[1];
    //   msn = "Bienvenido a ";
    //   msn2 = this.NombreF + " " + this.Apellido;
    salir(): void {
      this.dialogRef.close();
    }
  
  }