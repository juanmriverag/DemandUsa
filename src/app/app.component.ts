import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Bienvenido_modal } from './popups/Bienvenida/Bienvenido';
import { Alert_modal } from './popups/Alert/Alert';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  //icono galleta
  faCookieBite = faCookieBite;

  //controler
  constructor(
    private router: Router,
    private cookies: CookieService,
    private _appService: AppService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
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
      var locals = JSON.parse(localStorage.getItem('InfoUsu'));
      if (!locals) {
        this.cookies.deleteAll();
        localStorage.clear();
        this.dialog.open(Alert_modal, {
          width: '500px',
          data: {
            title: 'Error.!',
            textContent: "Ocurrio un error al intentar conectar con el servidor, revise su conexión y vuelva a intentarlo.",
            cancel: 'Aceptar.'
          }
        });
        this.router.navigate(['/login']);
        return "";
      }
      return datos;
    }
    else {
      this.UrlMTS = '';
      localStorage.clear();
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
      this.dialog.closeAll();
      this.dialog.open(Bienvenido_modal, {
        width: '400px',
        data: { Nombre: this.NombreUsuario },
        panelClass: 'BienvePanel'
      });
    }
  }

  private getMenu() {
    if (this.rol != undefined) {
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
    else {
      this.router.navigate(['/login']);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "bottom",
      horizontalPosition: "end",
      panelClass: 'custom-class'
    });
  }
  // ListMarcas = ["Saltin Noel", "Festival", "Ducales", "Noel", "Tosh", "Dux", "Kibo", "Corona"];
  IrDForecast(_model: any, Brand: string) {

    if (Brand == "") {
      if (_model.MenuId < 200) {
        this.MarcaSelect = _model.Codigo;
        this.NomTitle(this.MarcaSelect);
        this.router.navigate(['/DemandForecast']);
      }
      else {
        this.router.navigate([_model.Path]);
      }
    }
    else {
      this.MarcaSelect = Brand;
      this.NomTitle(this.MarcaSelect);
      this.router.navigate(['/DemandForecast']);
    }

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
