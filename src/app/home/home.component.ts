import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Mostrar;
  menu: any[];
  ListMarcas = ["Saltin Noel", "Festival", "Ducales", "Noel", "Tosh", "Dux", "Carve", "Corona"];
  constructor(private _appComponent: AppComponent, private router: Router) {
    this._appComponent.ObtenerNombreUsu();
    this._appComponent.CambioM(true);
    this._appComponent.buildTogglerOff();
    this._appComponent.NomTitle("");
  }

  IrDForecast(Id: number) {
    this._appComponent.MarcaSelect = this.ListMarcas[Id];
    this._appComponent.NomTitle(this._appComponent.MarcaSelect);
    this.router.navigate(['/DemandForecast']);
  }


  ngOnInit() {

    this.Mostrar = this._appComponent.Mostrar;
    $.getScript('../../assets/js/snake.js');

  }


}
