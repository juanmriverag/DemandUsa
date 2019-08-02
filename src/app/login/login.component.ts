import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { Alert_modal } from '../popups/Alert/Alert';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Mostrar;
  modelUser: string;
  modelPass: string;
  UsuRegistrado: any;
  UsuNORegistrado: any;
  EstadoUsu: number;
  Token: string;
  mensajeError :string = null;
  constructor(private appComponent: AppComponent, private cookies: CookieService, private _appService: AppService, public dialog: MatDialog) { 
    this.cookies.delete("CLB");
    this.appComponent.CambioM(false);
    this.appComponent.buildTogglerOff();
    this.appComponent.NomTitle("");
  }


  //enter 
  public PressEn(E: any) {
    if (E.which === 13) {
      this.realizarAutenticacion();
    }

  }

  public realizarAutenticacion() {

    ///Verificar datos
    if (this.modelUser != undefined && this.modelPass != undefined) {

      var credencialesEncriptadas = btoa(this.modelUser + ':' + this.modelPass);

      this._appService.postPTLogin(credencialesEncriptadas, this.modelUser, this.modelPass).subscribe(data => {
        ///UsuRegistrado =  datos De base de datos ABACO.
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
            // $mdDialog.show(
            //   {
            //     locals: {

            //       scope: $scope,
            //       Usuario: UsuRegistrado

            //     },
            //     controller: ['$scope', 'scope', 'Usuario',
            //       function ($scope, scope, Usuario) {


            //         $scope.MensajeVAlerta = "Señor(a) " + Usuario.Nombre + ", Su cuenta se encuentra desactivada, por favor contacte al administrador de los ÁBACOS..";
            //         $scope.BotonS = "Aceptar";


            //         $scope.salir = function () {

            //           $mdDialog.hide();

            //         }
            //         $scope.Siguiente = function () {

            //           $mdDialog.hide();

            //         }

            //       }],
            //     templateUrl: 'static/views/FormInMMS/AlertaG.html',
            //     clickOutsideToClose: false, escapeToClose: true, openFrom: ({ top: -50, width: 30, height: 80 }), closeTo: ({ left: 1000 })
            //   })
          }
          else {
            ///Hacer Login.
            this.cookies.set("CLB", this.Token);
           
            this.appComponent.HacerLogin(this.UsuRegistrado);

          }
        }
        else if (this.UsuNORegistrado != null) {

        }
        else {
          this.dialog.open(Alert_modal, {
            width: '500px',
            data: {
              title: 'Error.!',
              textContent: 'Señor Usuario Ocurrio un error, Es probable que sus credenciales no sean correctas. Intentelo de nuevo',
              ok: 'Intentar de nuevo.'
            }
          });

        }
      });
    }
    else {

      this.dialog.open(Alert_modal, {
        width: '500px',
        data: {
          title: 'Error.!',
          textContent: 'Señor Usuario Ocurrio un error, es probable que No ha llenado todos los campos. Intentelo de nuevo',
          ok: 'Intentar de nuevo.'
        }
      });

    }
  }


  ngOnInit() {
    this.Mostrar = this.appComponent.Mostrar;
  }

}
