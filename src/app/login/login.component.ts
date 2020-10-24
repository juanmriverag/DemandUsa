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
		private _appService: AppService,
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

			this._appService.postPTLogin(credencialesEncriptadas, this.modelUser, this.modelPass).subscribe((data) => {
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
									'Señor(a) ' +
									this.UsuRegistrado.Nombre +
									', Su cuenta se encuentra desactivada, por favor contacte al administrador de la App..',
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
							title: 'Error.!',
							textContent:
								'Señor(a) ' +
								this.UsuNORegistrado.DisplayName +
								", Usted no se encuentra en nuestra App, Si desea registrarse de clic en el boton 'Registrarse'.",
							ok: 'Registrarse',
							cancel: 'Cancelar',
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
							this._appService.postUser(model).subscribe((data) => {
								this.dialog.open(Alert_modal, {
									width: '500px',
									data: {
										title: 'Registro completo.!',
										textContent:
											'Señor Usuario ahora se encuentra registrado pero descativado, para que su cuenta este activa debe esperar que el administrador del sistema lo haga.',
										ok: 'Aceptar',
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
							textContent: 'Señor Usuario Ocurrio un error, Es probable que sus credenciales no sean correctas. Intentelo de nuevo',
							cancel: 'Intentar de nuevo.',
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
					textContent: 'Mister User An error occurred, it is probable that You have not filled all the fields. Try again',
					cancel: 'Intentar de nuevo.',
				},
			});
		}
	}

	ngOnInit() {
		this.Mostrar = this.appComponent.Mostrar;
	}
}
