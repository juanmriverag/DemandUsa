import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  // definiciones
  Mostrar: boolean;
  ListUsers: any;
  ListRoles: {};
  columnsToDisplay: string[] = ['id', 'username', 'alias', 'nombre', 'rol', 'estado'];

  constructor(private _appComponent: AppComponent, private _appService: AppService) {
    this._appComponent.ObtenerNombreUsu();
    this._appComponent.CambioM(true);
    this._appComponent.NomTitle("Control de usuarios");
    this.obtenerList();
  }

  obtenerList() {
    this._appService.getAllUsers().subscribe(data => {
      this.ListUsers = new MatTableDataSource(data['Usuarios']);
      this.ListRoles = data['ListRoles'];
    });
  }

  guardarCambios(_model) {
    this._appService.putUsers(_model).subscribe(data => {

    })
  }

  cambiarAlias(keyEvent, _model){
    if (keyEvent.which === 39 || keyEvent.which === 13) {
      this.guardarCambios(_model);
    }
  }

  cambEstado(_model) {
    var index = this.ListUsers.data.indexOf(_model);
    _model.Estado = (_model.Estado == 1) ? 2 : 1;
    this.ListUsers.data[index] = _model;
    this.guardarCambios(_model);
  }

  ngOnInit() {
    this.Mostrar = this._appComponent.Mostrar;
    $("app-usermanager").addClass('js-pscroll');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfectEject.js')
  }

}
