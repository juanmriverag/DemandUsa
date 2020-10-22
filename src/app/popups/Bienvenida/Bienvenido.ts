import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
	selector: 'Bienvenido',
	templateUrl: 'Bienvenido.html',
	styleUrls: ['Bienvenido.css'],
})
export class Bienvenido_modal implements OnInit, OnDestroy {
	constructor(
		public dialogRef: MatDialogRef<Bienvenido_modal>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			Nombre: string;
		}
	) {}

	NombreF: string = this.data.Nombre.split(' ', 2)[0];
	Apellido: string = this.data.Nombre.split(' ', 2)[1];
	msn = '¡Hello!';
	msn2 = 'Welcome to';
	salir(): void {
		this.dialogRef.close();
	}
	ngOnInit(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
	ngOnDestroy(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
}
