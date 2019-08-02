import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Bienvenido_modal } from './popups/Bienvenida/Bienvenido';
import * as $ from 'jquery';

// import '../lib/menuH/menu';
// import * as $ from 'jquery';
// import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent implements OnInit {


  //controler
  constructor(
    private router: Router,
    private cookies: CookieService,
    private _appService: AppService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) { }

  //init
  dateNow: any;
  Mostrar: boolean = true;
  LockedSnav: boolean;
  UrlMTS = '';
  UrlMTO = '';
  UrlPromo = '';
  UrlPrDetallada = '';
  NR = 1;
  nameMTs = '';
  ABC = true;
  ListaMenus: Array<any> = [];
  rol: number;
  EmailG: string;
  Username: string;
  widthMax: number;
  NombreTitulo: string;
  MarcaSelect: string = "";

  public NombreUsuario: string;
  IDUsu: any;

  CambioM(M: boolean) {
    this.Mostrar = M;

  }

  NomTitle(M: string) {
    this.NombreTitulo = M;
    var title = 'DemandForecast ';
    if (M != "") {
      title = 'DemandForecast - ' + M;
      document.title = title;
      localStorage.setItem('TitleDocument', JSON.stringify(M));
    } else {
      document.title = title;
      localStorage.setItem('TitleDocument', JSON.stringify(title));
    }
  }


  buildTogglerOff() {
    this.LockedSnav = false;
  }
  ToolbarMostrar() {
    if (this.Mostrar) {
      this.Mostrar = false;
    }
    else {
      this.Mostrar = true;
    }
  }

  changeEstado() {

    if (this.IDUsu != undefined && this.IDUsu != "") {

      this._appService.getEstadoUs(this.IDUsu).subscribe(data => {

        if (data['Estado'] != 2) {
          // $mdDialog.show(
          //   $mdDialog.alert()
          //     .parent(angular.element(document.querySelector('#popupContainer')))
          //     .clickOutsideToClose(true)
          //     .title('Atención.!')
          //     .textContent('Su cuenta se encuentra desactivada, por favor contacte al administrador de los ÁBACOS.')
          //     .ariaLabel('Alert Dialog Demo')
          //     .ok('Aceptar')

          // );
          this.UrlMTS = '';
          this.router.navigate(['/login']);


        }

      });

    }

  }

  ObtenerCook() {

    var Cookie = this.cookies.get("CLB");
    if (Cookie != null && Cookie != "") {

      var DatosCookie = Cookie.split('.');
      var datos = JSON.parse(atob(DatosCookie[1]));
      return datos;
    }
    else {
      this.UrlMTS = '';
      this.router.navigate(['/login']);
      return "";
    }

  }
  public ObtenerNombreUsu() {

    var datos = this.ObtenerCook()

    var Rol = datos.Rol;

    var locals = JSON.parse(localStorage.getItem('InfoUsu'));
    this.NombreUsuario = locals.name;
    this.EmailG = locals.mail;
    this.Username = datos.Usuario;
    this.rol = Rol;
    this.getMenu();
    return Rol;
  }

  HacerLogin(Usu: any) {

    var datos = Usu;
    this.rol = datos.RolId;
    if (datos.Nombre != null) {

      this.NombreUsuario = datos.Nombre;

      localStorage.setItem('InfoUsu', JSON.stringify({ name: this.NombreUsuario, mail: datos.Email }));
      this.EmailG = datos.Email;
      this.router.navigate(['/home']);
      //modal
      this.dialog.open(Bienvenido_modal, {
        width: '500px',
        data: { Nombre: this.NombreUsuario }
      });
    }
  }

  private getMenu() {
    this.ListaMenus = [];
    var menus = this.ListaMenus;
    this._appService.getMenuxRol(this.rol).subscribe(data => {
      var dataList = data['ListMenuxRol'];
      dataList.forEach(function (menu) {
        if (menu.PadreID == "0") {
          menu['Submenus'] = [];
          dataList.forEach(function (submenu) {
            if (menu.MenuId == submenu.PadreID) {
              menu['Submenus'].push(submenu);
            }
          });
          menus.push(menu);
        }
      });
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onResize(event) {
    this.widthMax = screen.width;
  }
  public ngOnInit() {
    this.widthMax = screen.width;

    $.getScript('../assets/js/jquery.fullscreen.js');

  }

}
