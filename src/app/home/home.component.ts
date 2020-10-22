import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
declare function NSFunctionMostrarMenus(mostrar: boolean): any;
import * as $ from 'jquery';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	Mostrar;
	videoUrl = '../../media/DemandForecast.mp4';
	menu: any[];
	ListMarcas = ['National Account', 'Office Central', 'North-East', 'West', 'Maryland', 'B2B', 'Central', 'Florida'];
	constructor(private _appComponent: AppComponent, private router: Router) {
		this._appComponent.ObtenerNombreUsu();
		this._appComponent.CambioM(true);
		this._appComponent.buildTogglerOff();
		this._appComponent.NomTitle('');
	}

	IrDForecast(Id: number) {
		this._appComponent.IrDForecast(null, this.ListMarcas[Id]);
		// this._appComponent.MarcaSelect = this.ListMarcas[Id];
		// this._appComponent.NomTitle(this._appComponent.MarcaSelect);
		// this.router.navigate(['/DemandForecast']);
	}

	ngAfterViewInit() {
		NSFunctionMostrarMenus(true);
	}

	ngOnInit() {
		this.Mostrar = this._appComponent.Mostrar;
		$.getScript('../../assets/js/snake.js');
	}
}
