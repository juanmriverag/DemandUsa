import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    selector: 'Alert',
    templateUrl: 'Alert.html',
  })
  export class Alert_modal implements OnInit,OnDestroy {

    constructor(
      public dialogRef: MatDialogRef<Alert_modal>,
      @Inject(MAT_DIALOG_DATA) public data: {
        title: string;
        textContent : string;
        ok: string;
        cancel: string;
      }) {  }


    //   NombreF : string =  this.data.Nombre.split(" ", 2)[0];
    //   Apellido : string =  this.data.Nombre.split(" ", 2)[1];
    //   msn = "Bienvenido a ";
    //   msn2 = this.NombreF + " " + this.Apellido;
    Ok(): void {
      this.dialogRef.close(true);
    }
    Cancel(): void {
      this.dialogRef.close();
    }
    ngOnInit(): void {
      $(document).find('body app-root').toggleClass("blurclass");
    }
    ngOnDestroy(): void{
      $(document).find('body app-root').toggleClass("blurclass");
    }
  }
