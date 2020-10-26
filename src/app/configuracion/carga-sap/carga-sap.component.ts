import { Component, OnInit, ViewChild } from '@angular/core';
import { XlsxToJsonService } from '../../xlsx-to-json-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { Alert_modal } from '../../popups/Alert/Alert';
import { Load_modal } from '../../popups/Load/Load';

@Component({
	selector: 'app-carga-sap',
	templateUrl: './carga-sap.component.html',
	styleUrls: ['./carga-sap.component.css'],
})
export class CargaSapComponent implements OnInit {
	Mostrar;
	TituloArchivo: string;
	ListOfData = [];
	public result: any;
	private xlsxToJsonService: XlsxToJsonService = new XlsxToJsonService();
	selectedValue: number;
	dataSource: any = [];
	columnsToDisplay = [];
	TypesDocs = [
		{ key: 'Sales', value: 0 },
		{ key: 'Pronostico', value: 1 },
		{ key: 'Precios', value: 2 },
		{ key: 'Sales y Ppto$', value: 3 },
	];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private _appComponent: AppComponent, private _appService: AppService, public dialog: MatDialog) {
		this._appComponent.ObtenerNombreUsu();
		this._appComponent.CambioM(true);
		this._appComponent.buildTogglerOff();
		this._appComponent.NomTitle('Carga SAP');
		this.dataSource = this.ListOfData;
	}

	ObtenerHeaders() {
		var _model = this.ListOfData[0];
		var Encabe = [];
		for (var Column in _model) {
			Encabe.push(Column);
		}
		this.dataSource = new MatTableDataSource(this.ListOfData);
		this.dataSource.paginator = this.paginator;

		this.columnsToDisplay = Encabe;
	}

	FileToData(event) {
		console.log('Cargado... archivo');
		let file = event.target.files[0];
		this.TituloArchivo = file.name;
		this.xlsxToJsonService.processFileToJson({}, file).subscribe((data) => {
			var resultArray = Object.keys(data['sheets']).map(function (personNamedIndex) {
				let person = data['sheets'][personNamedIndex];
				// do something with person
				return person;
			});

			if (resultArray.length > 0 && !resultArray[0][0][''] && !resultArray[0][0]['_1']) {
				this.ListOfData = resultArray[0];

				this.ObtenerHeaders();
			} else {
				console.log('error.!');
			}
		});
	}

	Publicar() {
		this.dialog.open(Load_modal, {
			width: '500px',
			backdropClass: 'Transparent-class',
			panelClass: 'Transparent-class2',
			disableClose: true,
		});

		this._appService.postCargarSap(this.selectedValue, this.ListOfData).subscribe((data) => {
			this.dialog.closeAll();
			if (data['Status'] > 0) {
				this.dialog.open(Alert_modal, {
					width: '500px',
					data: {
						title: 'Completado.!',
						textContent: 'El archivo de ' + this.TypesDocs[this.selectedValue].key + ', Ha cargado exitosamente.',
						ok: 'Aceptar.',
					},
				});
			} else {
				this.dialog.open(Alert_modal, {
					width: '500px',
					data: {
						title: 'Error.!',
						textContent: 'Señor Usuario Ocurrio un error, Es probable que el archivo no tenga un formato valido. Intentelo de nuevo',
						cancel: 'Aceptar.',
					},
				});
			}
		});
	}

	ngOnInit() {
		this.Mostrar = this._appComponent.Mostrar;

		$('app-carga-sap').addClass('js-pscroll');
		$.getScript('../../assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
		$.getScript('../../assets/vendor/perfect-scrollbar/perfectEject.js');
	}
}
