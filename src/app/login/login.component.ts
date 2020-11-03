import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { Alert_modal } from '../popups/Alert/Alert';
import { Load_modal } from '../popups/Load/Load';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	Mostrar;
	modelUser: string;
	modelPass: string;
	UsuRegistrado: any;
	UsuNORegistrado: any;
	EstadoUsu: number;
	Token: string;
	mensajeError: string = null;
	constructor(
		private appComponent: AppComponent,
		private cookies: CookieService,
		private appService: AppService,
		public dialog: MatDialog
	) {
		this.cookies.delete('CLB');
		this.appComponent.CambioM(false);
		this.appComponent.buildTogglerOff();
		this.appComponent.NomTitle('');
	}

	//enter
	public PressEn(E: any) {
		if (E.which === 13) {
			this.realizarAutenticacion();
		}
	}

	public realizarAutenticacion() {
		this.dialog.open(Load_modal, {
			width: '500px',
			backdropClass: 'Transparent-class',
			panelClass: 'Transparent-class2',
			disableClose: true,
		});
		///Verificar datos
		if (this.modelUser != undefined && this.modelPass != undefined) {
			var credencialesEncriptadas = btoa(this.modelUser + ':' + this.modelPass);

			this.appService.postPTLogin(credencialesEncriptadas, this.modelUser, this.modelPass).subscribe((data) => {
				///UsuRegistrado =  datos De base de datos DEMAN.
				this.UsuRegistrado = data['Usuario'];
				///UsuNORegistrado = datos del directorio activo.
				this.UsuNORegistrado = data['Usuarios'];
				///EstadoUsu = estado de respuesta.
				this.EstadoUsu = data['Estado'];

				this.Token = data['Token'];

				///Verificar y obtener datos traidos.
				if (this.UsuRegistrado != null) {
					// EstadoUsu(this.UsuRegistrado.PersonaId);
					if (this.EstadoUsu == 1) {
						///Mensaje Para usuario cuando no esta activo.
						this.dialog.closeAll();
						this.dialog.open(Alert_modal, {
							width: '500px',
							data: {
								title: 'Error.!',
								textContent:
									'User  ' +
									this.UsuRegistrado.Nombre +
									', Your account is deactivated, please contact the administrator of the App..',
								cancel: 'Aceptar.',
							},
						});
					} else {
						///Hacer Login.
						this.cookies.set('CLB', this.Token, null, null, null, false, 'Lax');

						this.appComponent.HacerLogin(this.UsuRegistrado);
					}
				} else if (this.UsuNORegistrado != null) {
					this.dialog.closeAll();
					const dialogRef = this.dialog.open(Alert_modal, {
						width: '500px',
						data: {
							title: 'Alert!!!',
							textContent:
								'User ' + this.UsuNORegistrado.DisplayName + ", You are not yet registered in our App, click on the 'Sing up' button.",
							ok: 'Sing Up',
							cancel: 'Cancel',
						},
					});

					dialogRef.afterClosed().subscribe((result) => {
						if (result) {
							var model = {
								Nombre: this.UsuNORegistrado.DisplayName,
								Email: this.UsuNORegistrado.Email,
								Username: this.UsuNORegistrado.UserName,
								Contrasena: this.modelPass,
							};
							this.appService.postUser(model).subscribe((data) => {
								this.dialog.open(Alert_modal, {
									width: '500px',
									data: {
										title: 'Full record.!',
										textContent:
											"You're already registered but disabled, so that your account is active should expect the system administrator you do.",
										ok: 'Ok',
									},
								});
							});
						}
					});
				} else {
					this.dialog.closeAll();
					this.dialog.open(Alert_modal, {
						width: '500px',
						data: {
							title: 'Error.!',
							textContent:
								'Sorry, an error occurred, Your credentials are probably not correct. If the error persists, contact the administrator.',
							cancel: 'Try again',
						},
					});
				}
			});
		} else {
			this.dialog.closeAll();
			this.dialog.open(Alert_modal, {
				width: '500px',
				data: {
					title: 'Error.!',
					textContent: 'Sorry, an error occurred, it is probable that You have not filled all the fields.',
					cancel: 'Try again',
				},
			});
		}
	}

	ngOnInit() {
		this.Mostrar = this.appComponent.Mostrar;
	}
}
