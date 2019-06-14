import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu: any[];

  constructor( private _appComponent: AppComponent) {
    
  }

  

  ngOnInit() {
    this._appComponent.ObtenerNombreUsu();
    this._appComponent.CambioM(true);
    this._appComponent.buildTogglerOff();
    $.getScript('../../assets/js/snake.js');
    $.getScript('../../assets/js/Menu.js');
   
  }


}
