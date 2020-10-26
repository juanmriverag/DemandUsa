import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	AfterViewInit,
	ElementRef,
	Output,
	EventEmitter,
} from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { MatTableDataSource, MatDialog, MatSort, Sort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Alert_modal } from '../popups/Alert/Alert';
import { Load_modal } from '../popups/Load/Load';
import { Note_modal } from '../popups/Note/Note';
import { Notes_modal } from '../popups/Notes/Notes';
import { TablaVts_modal } from '../popups/TablaVts/TablaVts';
import { GraficaVts_modal } from '../popups/GraficaVts/GraficaVts';
import { itemChartP_modal } from '../popups/itemChartP/itemChartP';
import { CumpTotal_modal } from '../popups/CumpTotal/CumpTotal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { newNovedad_modal } from '../popups/newNovedad/newNovedad';
import { ResizeEvent } from 'angular-resizable-element';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

declare function NSFunctionMostrarMenus(mostrar: boolean): any;

@Component({
	selector: 'app-colaboracion-v',
	templateUrl: './colaboracion-v.component.html',
	styleUrls: ['./colaboracion-v.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0', marginTop: '0', marginBottom: '0' })),
			state('expanded', style({ height: '*', marginTop: '5px', marginBottom: '5px' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
		trigger('detailExpand2', [
			state('collapsed', style({ zIndex: '-10', position: 'absolute', opacity: '0' })),
			state('expanded', style({ zIndex: 'auto', position: 'sticky', opacity: '1' })),

			transition('expanded <=> collapsed', animate('225ms linear')),
		]),
	],
})
export class ColaboracionVComponent implements OnInit, AfterViewInit {
	meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	mesActual = 0;
	dataChartItem = {};
	displayedColumns = [
		'category',
		'company',
		'brand',
		'item',
		'description',
		'monthN_3',
		'monthN_2',
		'monthN_1',
		'monthN',
		'average',
		'monthN1',
		'monthN2',
		'monthN3',
		'mape',
		'price',
		'notas',
	];
	displayedColumns2 = [
		'category',
		'company',
		'FmonthN1',
		'FmonthN2',
		'FmonthN3',
		'PmonthN1',
		'PmonthN2',
		'PmonthN3',
		'CumonthN1',
		'CumonthN2',
		'CumonthN3',
	];
	displayedColumns3: string[] = [];
	Marcas: [];
	OkDMForeCast: boolean = false;
	ListDMForeCast: any = [];
	ListDMForeCast_: any = [];
	ListBudgetOrig: any = [];
	ListBudget: any = [];
	ListCopiaColab: any = [];
	ListTerCompliance: any = [];
	EncabColab: any;
	Headerdis1: string[] = [];
	Headerdis2: string[] = [];
	ListFiltrDispo: any = [];
	ListYears: Array<any> = [];
	ListClients: any = [];
	originElement;
	Mostrar;
	Ctrl = this;
	ListFiltrs = {
		Clients: [],
		Categories: [],
		Companies: [],
		Brands: [],
	};
	ItemSelect: {};

	@Output() Finish: EventEmitter<null> = new EventEmitter();
	@ViewChild(TablaVts_modal, { static: false }) _TablaVts_modal: TablaVts_modal;
	@ViewChild(GraficaVts_modal, { static: false }) _GraficaVts_modal: GraficaVts_modal;
	@ViewChild(itemChartP_modal, { static: false }) _itemChartP_modal: itemChartP_modal;
	@ViewChild(CumpTotal_modal, { static: false }) _CumpTotal_modal: CumpTotal_modal;
	@ViewChild(TemplateRef, { static: true }) _dialogTemplate: TemplateRef<any>;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private elRef: ElementRef,
		private _appComponent: AppComponent,
		private _appService: AppService,
		public dialog: MatDialog,
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef
	) {
		this._appComponent.ObtenerNombreUsu();
		this._appComponent.CambioM(true);
		// this._appComponent.buildTogglerOff();
		this.load();
		this.obtenerMesActual();

		// this._appComponent.NomTitle(JSON.parse(localStorage.getItem('TitleDocument')));
	}

	load() {
		this.dialog.open(Load_modal, {
			width: '500px',
			backdropClass: 'Transparent-class',
			panelClass: 'Transparent-class2',
			disableClose: true,
		});
	}

	//filter columnas a filtrar
	filtrClient = '';
	Filtr = {
		Territory: '',
		Category: '',
		Client: '',
		Company: '',
		Brand: '',
	};
	Bus = {
		Territory: '',
		Category: '',
		Company: '',
		Client: '',
		Brand: '',
		Item: '',
		Description: '',
	};
	Bus2 = {
		Category: '',
		Company: '',
	};
	Bus3 = {
		Year1: '-1',
		Year2: '-1',
		Year3: '-1',
	};
	Notes = [];
	// validador de inputs de filtros
	Ca: boolean = false;
	Cl: boolean = false;
	Cg: boolean = false;
	Mc: boolean = false;
	Sm: boolean = false;
	Mt: boolean = false;
	Des: boolean = false;

	//funcion validadora
	SysFiltering(Input: string) {
		if (Input == 'Cl') {
			this.Cl = true;
			this.Ca = false;
			this.Cg = false;
			this.Mc = false;
			this.Sm = false;
			this.Mt = false;
			this.Des = false;
		} else if (Input == 'Ca') {
			this.Cl = false;
			this.Ca = true;
			this.Cg = false;
			this.Mc = false;
			this.Sm = false;
			this.Mt = false;
			this.Des = false;
		} else if (Input == 'Cg') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = true;
			this.Mc = false;
			this.Sm = false;
			this.Mt = false;
			this.Des = false;
		} else if (Input == 'Mc') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = false;
			this.Mc = true;
			this.Sm = false;
			this.Mt = false;
			this.Des = false;
		} else if (Input == 'Sm') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = false;
			this.Mc = false;
			this.Sm = true;
			this.Mt = false;
			this.Des = false;
		} else if (Input == 'Mt') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = false;
			this.Mc = false;
			this.Sm = false;
			this.Mt = true;
			this.Des = false;
		} else if (Input == 'Des') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = false;
			this.Mc = false;
			this.Sm = false;
			this.Mt = false;
			this.Des = true;
		} else if (Input == 'MM') {
			this.Cl = false;
			this.Ca = false;
			this.Cg = false;
			this.Mc = false;
			this.Sm = false;
			this.Mt = false;
			this.Des = false;
		} else {
			if (
				this.Cl == true ||
				this.Ca == true ||
				this.Cg == true ||
				this.Mc == true ||
				this.Sm == true ||
				this.Mt == true ||
				this.Des == true
			) {
				this.Cl = false;
				this.Ca = false;
				this.Cg = false;
				this.Mc = false;
				this.Sm = false;
				this.Mt = false;
				this.Des = false;
			}
		}
	}

	//Construir filtros

	//aplicador de filtro
	applyFilter() {
		this.ListDMForeCast.filter = JSON.stringify(this.Bus);
	}
	applyFilter2() {
		this.ListDMForeCast_.filter = JSON.stringify(this.Bus2);
	}
	applyFilter3() {
		this.getBudget();
	}
	applyFilter4() {
		for (let i = 0; i < this.ListYears.length; i++) {
			const element = this.ListYears[i];
			var val = '-1';
			if (element.checked) {
				val = element.year;
			}
			this.Bus3['Year' + (i + 1)] = val;
		}
		this.ListBudget.filter = JSON.stringify(this.Bus3);
	}
	changeFiltr5() {
		this.applyFilter5();
		this.getDMForeCast();
	}
	applyFilter5() {
		if (this.filtrClient == '') {
			this.filtrClient = '-';
			this.getDMForeCast();
		} else {
			var i = 0;
			this.filtrClient = '';
			this.ListClients.forEach((element) => {
				if (element.checked) {
					var elemt = i > 0 ? ',' : '';
					this.filtrClient += elemt + element.canal;
					i++;
				}
			});

			if (this.filtrClient == '') {
				this.filtrClient = this.ListClients[0].canal;
				this.ListClients[0].checked = true;
			}

			this.getDMForeCast_();
		}
	}
	getMarcas() {
		this._appService.getAllMarca().subscribe((data) => {
			this.Marcas = data['ListMarcas'];
		});
	}

	getDMForeCast() {
		// if (this.filtrCanal == '') {
		// 	this.filtrCanal = '-';
		// }

		this._appService.getAllDMForeCastXTerritory(this.Bus.Territory, this.filtrClient).subscribe((data) => {
			this.ListDMForeCast = new MatTableDataSource(data['ListColabs']);

			this.ListDMForeCast.sort = this.sort;
			this.ListDMForeCast.filterPredicate = this.tableFilter();

			this.OkDMForeCast = true;
			this.ListCopiaColab = data['ListColabs'];
			this.EncabColab = this.ListCopiaColab[0];
			this.applyFilter();
			if (this.filtrClient == '-') {
				this.getAllClients();
			}
			this.getNotes();
			//---------------------------------------------
		});
	}

	getSizeDMForeCast() {
		if (this.OkDMForeCast) {
			return this.ListDMForeCast.filteredData.length;
		} else {
			return 0;
		}
	}
	getDMForeCast_() {
		this._appService.getAllDMForeCast_(this.Bus.Territory, this.filtrClient).subscribe((data) => {
			this.ListDMForeCast_ = new MatTableDataSource(data['ListColabs_']);

			this.ListDMForeCast_.filterPredicate = this.tableFilter2();

			this.applyFilter2();
			this.getBudget();
		});
	}

	getBudget() {
		this._appService
			.getAllBudget(this.Filtr.Client, this.Filtr.Category, this.Bus.Territory, this.Filtr.Company, this.Filtr.Brand)
			.subscribe((data) => {
				this.ListBudgetOrig = data['ListBudget'];
				this.manageBudget();
				this.getCumpTotal();
				this.getFiltrDisp();
				this.Finish.emit();
			});
	}

	getCumpTotal() {
		this._appService.getAllCompTotal().subscribe((data) => {
			this.ListTerCompliance = data['ListTerCompliance'];
			this.dialog.closeAll();
		});
	}

	getFiltrDisp() {
		this._appService
			.getAllFiltrDisp(this.Filtr.Client, this.Filtr.Category, this.Bus.Territory, this.Filtr.Company, this.Filtr.Brand)
			.subscribe((data) => {
				this.ListFiltrDispo = data['ListFiltr'];
				this.ListFiltrs.Clients = this.ListUnique(this.ListFiltrDispo, 'Client');
				this.ListFiltrs.Categories = this.ListUnique(this.ListFiltrDispo, 'Category');
				this.ListFiltrs.Companies = this.ListUnique(this.ListFiltrDispo, 'Company');
				this.ListFiltrs.Brands = this.ListUnique(this.ListFiltrDispo, 'Brand');
			});
	}

	ListUnique(List, Column: string) {
		var Uniques = List.map((data) => data[Column]);
		return Uniques.filter((x, i, a) => x && a.indexOf(x) === i);
	}

	manageBudget() {
		this.Headerdis1 = [];
		this.Headerdis2 = [];
		this.displayedColumns3 = [];

		var cum = 0;
		var mag = this.ListBudgetOrig;

		this.ListYears = this.ListUnique(mag, 'Year').map(function (item) {
			var obj = { year: item, checked: true };
			return obj;
		});

		// this.ListYears.push({ year: 2020, checked: true })

		for (var Column in mag[0]) {
			if (Column != 'Id') {
				if (Column.indexOf('M') == -1) {
					this.Headerdis1.push(Column);
				} else {
					this.Headerdis2.push(Column);
				}
				this.displayedColumns3.push(Column);
			}
		}
		this.ListBudget = new MatTableDataSource(this.ListBudgetOrig);
		this.ListBudget.sort = this.sort;
		this.ListBudget.filterPredicate = this.tableFilter3();
		this.applyFilter4();
	}

	sortData(sort: Sort) {
		const data = this.ListBudgetOrig.slice();
		if (!sort.active || sort.direction === '') {
			this.ListBudget.data = data;
			return;
		}

		this.ListBudget.data = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'Year':
					return this.compare(a.Year, b.Year, isAsc);
				case 'Variable':
					return this.compare(a.Id, b.Id, isAsc);
				default:
					return 0;
			}
		});
	}

	sortData2(sort: Sort) {
		const data = this.ListCopiaColab.slice();
		if (!sort.active || sort.direction === '') {
			this.ListDMForeCast.data = data;
			return;
		}

		this.ListDMForeCast.data = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'category':
					return this.compare(a.Category, b.Category, isAsc);
				case 'company':
					return this.compare(a.Company, b.Company, isAsc);
				case 'brand':
					return this.compare(a.Brand, b.Brand, isAsc);
				case 'average':
					return this.compare(a.Average, b.Average, isAsc);
				default:
					return 0;
			}
		});
	}

	compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
	//generador del filterPredicate del MatTableDataSource
	tableFilter(): (data: any, filter: string) => boolean {
		let filterFunction = function (data, filter): boolean {
			let searchTerms = JSON.parse(filter);
			return (
				data.Territory.toLowerCase().indexOf(searchTerms.Territory.toLowerCase()) !== -1 &&
				data.Category.toLowerCase().indexOf(searchTerms.Category.toLowerCase()) !== -1 &&
				data.Company.toLowerCase().indexOf(searchTerms.Company.toLowerCase()) !== -1 &&
				data.Brand.toLowerCase().indexOf(searchTerms.Brand.toLowerCase()) !== -1 &&
				data.Item.toLowerCase().indexOf(searchTerms.Item.toLowerCase()) !== -1 &&
				data.Description.toLowerCase().indexOf(searchTerms.Description.toLowerCase()) !== -1
			);
		};
		return filterFunction;
	}

	tableFilter2(): (data: any, filter: string) => boolean {
		let filterFunction = function (data, filter): boolean {
			let searchTerms = JSON.parse(filter);
			return (
				data.Category.toLowerCase().indexOf(searchTerms.Category.toLowerCase()) !== -1 &&
				data.Company.toLowerCase().indexOf(searchTerms.Company.toLowerCase()) !== -1
			);
		};
		return filterFunction;
	}
	tableFilter3(): (data: any, filter: string) => boolean {
		let filterFunction = function (data, filter): boolean {
			let searchTerms = JSON.parse(filter);
			return (
				data.Year.toString().indexOf(searchTerms.Year1.toString()) !== -1 ||
				data.Year.toString().indexOf(searchTerms.Year2.toString()) !== -1 ||
				data.Year.toString().indexOf(searchTerms.Year3.toString()) !== -1
			);
		};
		return filterFunction;
	}

	PostForeC(_model) {
		_model.MonthN1 = +_model.MonthN1;
		_model.MonthN2 = +_model.MonthN2;
		_model.MonthN3 = +_model.MonthN3;

		this._appService.putForeC(_model).subscribe((data) => {
			this.getDMForeCast_();
		});
	}

	deletePronos(_model) {
		debugger;
		this._appService.deleteColab(_model.Territory, _model.Item).subscribe((data) => {
			this.getDMForeCast();
		});
	}

	PreKeyEvent(keyEvent, _model) {
		var index = this.ListDMForeCast.data.indexOf(_model);

		if (keyEvent.which === 39 || keyEvent.which === 13) {
			this._appService.putPrices(_model).subscribe((data) => {
				this.getDMForeCast_();
			});
		}
	}

	susKeyEvent(keyEvent, _model, IdInp, numI) {
		var Id = '#v';

		var index = this.ListDMForeCast.data.indexOf(_model);

		if (keyEvent.which === 39 || keyEvent.which === 13) {
			Id = Id + (IdInp + 1);
			if (_model['MonthN' + numI] > _model.TopAverage && _model['MonthN' + numI] < _model.Average * 1.7) {
				this._appComponent.openSnackBar("You're forecasting above 30% of average sales. 🧐", '', 'Yellow');
			} else if (_model['MonthN' + numI] > _model.Average * 1.7) {
				this._appComponent.openSnackBar("¡Attention!...You're forecasting above 70% of the average sales. 🤔", '', 'Red');
			}

			this.PostForeC(_model);
			$(Id).focus();
		} else if (keyEvent.which === 37) {
			Id = Id + (IdInp - 1);
			$(Id).focus();
		} else if (keyEvent.which === 40) {
			Id = Id + (IdInp + 3);
			$(Id).focus();
		} else if (keyEvent.which === 38) {
			Id = Id + (IdInp - 3);
			$(Id).focus();
		} else if (keyEvent.which >= 65 && keyEvent.which <= 90 && keyEvent.which != 67 && keyEvent.which != 86) {
			if (index != -1) {
				if (numI == 1) {
					this.ListDMForeCast.data[index].MonthN1 = this.ListDMForeCast.data[index].MonthN1.substring(
						0,
						this.ListDMForeCast.data[index].MonthN1.length - 1
					);
				} else if (numI == 2) {
					this.ListDMForeCast.data[index].MonthN2 = this.ListDMForeCast.data[index].MonthN2.substring(
						0,
						this.ListDMForeCast.data[index].MonthN2.length - 1
					);
				} else if (numI == 3) {
					this.ListDMForeCast.data[index].MonthN3 = this.ListDMForeCast.data[index].MonthN3.substring(
						0,
						this.ListDMForeCast.data[index].MonthN3.length - 1
					);
				}
			}
		}
	}

	//obtiene mes del day -1 cuantos dias de le suma o resta
	obtenerMes(day: number) {
		if (day != null) {
			var d = new Date();
			d.setMonth(d.getMonth() + day, 7);
			return this.meses[d.getMonth()];
		}
		return 'none';
	}
	//obtiene mes del nummes
	obtenerMesO(nummes: number) {
		if (nummes != null) {
			return this.meses[nummes];
		}
		return 'none';
	}

	obtenerMesActual() {
		var d = new Date();
		this.mesActual = d.getMonth();
	}

	//obtiene año del string 'yyyy.mm'
	obtenerYear(Syear: string) {
		if (Syear) {
			var Nyear = +Syear.slice(0, 4);
			return Nyear;
		}
		return 'none';
	}

	getTotal(val: string) {
		var copy = this.ListDMForeCast_.filteredData;

		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	gettotalTerritorySummary(val: string) {
		var copy = this.ListTerCompliance;
		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	getTotal2(val: string) {
		var copy = this.ListDMForeCast.filteredData;
		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	getAllClients() {
		var _data = this.ListUnique(this.ListDMForeCast.data, 'Client');
		_data.forEach((element) => {
			this.ListClients.push({ canal: element, checked: true });
		});
		this.applyFilter5();
	}

	getCumplim_(val1, val2) {
		var div = val1 / val2;
		if (val1 == 0 || val2 == 0) {
			div = 0;
		}
		return div * 100;
	}

	onResizeEnd(event: ResizeEvent): void {
		this.originElement = $('.Custom-Dialog').get();
	}

	openDTablaVts() {
		this._TablaVts_modal.openDialog();
	}
	openDGraficaVts() {
		this._GraficaVts_modal.openDialog();
	}
	openDCumpTotal() {
		this._CumpTotal_modal.openDialog();
	}
	openDitemChartP(_model) {
		this.getChartItemData(_model).add((data) => {
			this._itemChartP_modal.openDialog(this.dataChartItem, _model);
		});
	}
	refresh() {
		this.getChartItemData(this.ItemSelect).add((data) => {
			this._itemChartP_modal.refresh(this.dataChartItem);
		});
	}

	AddNovedad() {
		const dialogRef = this.dialog.open(newNovedad_modal, {
			width: '600px',
			data: { Territory: this.Bus.Territory, ListUnique: this.ListUnique },
			panelClass: 'NewNovedadClass',
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.load();
				this.getDMForeCast();
			}
		});
	}

	getAll() {
		this.applyFilter5();
	}

	InsertNotesList() {
		this.ListDMForeCast.data.forEach((element) => {
			this.Notes.forEach((note) => {
				if (element.Territory == note.Territory && element.Item == note.Item) {
					element.IdNote = note.IdNote;
					note.Description = element.Description;
				}
			});
		});
	}

	cleanNoteList() {
		this.ListDMForeCast.data.forEach((element) => {
			element.IdNote = null;
		});
	}

	getNotes() {
		this._appService.getNotes().subscribe((rest) => {
			this.Notes = rest['ListNotes'];
			if (this.Notes.length > 0) {
				this.InsertNotesList();
			} else {
				this.cleanNoteList();
			}
		});
	}

	NewNote(Item: any) {
		var _Note = null;

		if (Item.IdNote != null) {
			_Note = this.Notes.find((Note) => Note.IdNote === Item.IdNote);
		}

		const dialogRef = this.dialog.open(Note_modal, {
			width: '700px',
			data: {
				item: Item,
				_Note: _Note,
				Creator: this._appComponent.NombreUsuario,
			},
			panelClass: 'NoteClass',
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.getNotes();
			}
		});
	}

	ListNotes() {
		const NotesM = this.dialog.open(Notes_modal, {
			width: '700px',
			data: {
				Notes: this.Notes,
			},
			panelClass: 'NoteClass',
		});

		NotesM.afterClosed().subscribe((result) => {
			if (result) {
				this.getNotes();
			}
		});
	}

	getChartItemData(_model) {
		return this._appService.getItemChart(_model.Territory, _model.Client, _model.Item).subscribe((req) => {
			this.dataChartItem = req['listItemChart'];
		});
	}

	chartItem(_model) {
		this.ItemSelect = _model;
		this.openDitemChartP(_model);
	}

	ngOnInit() {
		this.Mostrar = this._appComponent.Mostrar;
		var Terr: string = JSON.parse(localStorage.getItem('TitleDocument'));
		this.Bus.Territory = Terr.toLowerCase();
		this._appComponent.NomTitle(Terr);

		$('app-colaboracion-v').addClass('js-pscroll');
		$.getScript('../../assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
		$.getScript('../../assets/vendor/perfect-scrollbar/perfectEject.js');
		this.getAll();
	}

	ngAfterViewInit() {
		// $(".T2 tbody").addClass('js-pscroll');
		// $(".T2 tbody").addClass('tb');
		NSFunctionMostrarMenus(true);
	}
}
