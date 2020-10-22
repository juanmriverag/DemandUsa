import {
	Component,
	OnInit,
	ViewChild,
	TemplateRef,
	ViewContainerRef,
	AfterViewInit,
	OnDestroy,
	ElementRef,
	Input,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';
import { AppService } from '../../app.service';
import { MatTableDataSource } from '@angular/material';

// import { ColaboracionVComponent } from '../../colaboracion-v/colaboracion-v.component';
const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
@Component({
	selector: 'GraficaVts',
	templateUrl: './GraficaVts.html',
	styleUrls: ['../../colaboracion-v/colaboracion-v.component.css'],
})
export class GraficaVts_modal implements AfterViewInit, OnDestroy {
	@Input('Ctrl') _Ctrl; // entrada

	@ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
	private _overlayRef: OverlayRef;
	private _portal: TemplatePortal;
	ListForeCastChart: any = [];
	ListFiltrDispo: any = [];
	typechart = 'ComboChart';
	columnNames: string[] = [];
	data = [];
	Filtr = {
		Client: '',
		Category: '',
		Territory: '',
		Company: '',
		Brand: '',
	};
	ListFiltrs = {
		Clients: [],
		Categories: [],
		Companies: [],
		Brands: [],
	};
	Bus3 = {
		Year1: '-1',
		Year2: '-1',
		Year3: '-1',
	};
	options = {
		title: '',
		legend: { position: 'right', textStyle: { fontSize: 10 } },
		width: 950,
		height: 400,
		seriesType: 'bars',
		selectionMode: 'multiple',
		tooltip: { trigger: 'selection' },
		series: {
			0: { color: '#749AA8' },
			1: { type: 'line', color: '#2D4F5C' },
			// 2: { color: '#A99075' },
			// 3: { type: 'line', color: '#E8BC89' },
			// 3: { type: 'line', color: '#5C4A36' },
		},
		chartArea: { width: '70%', height: '90%' },
		// legend: { position: 'bottom' }
	};

	constructor(
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef,
		private loaderService: ScriptLoaderService,
		private _appService: AppService
	) {}

	//content
	closeDialog() {
		this._overlayRef.detach();
	}

	ngOnDestroy() {
		this._overlayRef.dispose();
	}

	openDialog() {
		this._overlayRef.attach(this._portal);
	}

	getFiltrDisp() {
		this._appService
			.getAllFiltrDisp(this.Filtr.Client, this.Filtr.Category, this._Ctrl.Bus.Territory, this.Filtr.Company, this.Filtr.Brand)
			.subscribe((data) => {
				this.ListFiltrDispo = data['ListFiltr'];
				this.ListFiltrs.Clients = this._Ctrl.ListUnique(this.ListFiltrDispo, 'Client');
				this.ListFiltrs.Categories = this._Ctrl.ListUnique(this.ListFiltrDispo, 'Category');
				this.ListFiltrs.Companies = this._Ctrl.ListUnique(this.ListFiltrDispo, 'Company');
				this.ListFiltrs.Brands = this._Ctrl.ListUnique(this.ListFiltrDispo, 'Brand');
			});
	}

	getForeCastChart() {
		this._appService
			.getForeChart(this.Filtr.Client, this.Filtr.Category, this._Ctrl.Bus.Territory, this.Filtr.Company, this.Filtr.Brand)
			.subscribe((data) => {
				debugger;
				this.ListForeCastChart = new MatTableDataSource(data['ListForeCastChart']);
				this.ListForeCastChart.filterPredicate = this.tableFilter();
				this.getFiltrDisp();
				this.crear();
			});
	}

	crear() {
		this.columnNames = [];
		this.data = [];
		this.columnNames.push('Month');

		const element = this._Ctrl.ListYears[1];
		if (element.checked) {
			this.columnNames.push('Sales-Forecast - ' + element.year);
			this.columnNames.push('Budget - ' + element.year);
		}

		this.ListForeCastChart.filteredData.forEach((element) => {
			element.Month = this._Ctrl.obtenerMesO(element.Month - 1);
			this.data.push([element.Month, this.isnull(element.ForecastCurrent), element.BudgetCurrent]);
		});
	}

	isnull(val) {
		if (val == 0) {
			return null;
		} else {
			return val;
		}
	}
	applyFilter() {
		for (let i = 0; i < this._Ctrl.ListYears.length; i++) {
			const element = this._Ctrl.ListYears[i];
			var val = '-1';
			if (element.checked) {
				val = element.year;
			}
			this.Bus3['Year' + (i + 1)] = val;
		}

		this.ListForeCastChart.filter = JSON.stringify(this.Bus3);
		this.crear();
	}

	tableFilter(): (data: any, filter: string) => boolean {
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
	applyFilter3() {
		this.getForeCastChart();
	}
	// options = {
	//     title: '',
	//     width: 600,
	//     height: 400,
	//     chartArea: { width: "100%", height: "50%" },
	//     legend: { position: 'bottom' }
	// };

	ngOnInit() {
		this._Ctrl.Finish.subscribe((o: any) => {
			this.getForeCastChart();
		});
	}
	ngAfterViewInit() {
		var originElement = $('.MainPadding').get()[0];
		this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
		this._overlayRef = this._overlay.create({
			positionStrategy: this._overlay
				.position()
				.flexibleConnectedTo(originElement)
				.withPositions([
					{
						originX: 'center',
						originY: 'center',
						overlayX: 'center',
						overlayY: 'center',
					},
				])
				.withFlexibleDimensions()
				.withPush(true)
				.withGrowAfterOpen(),
			// positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
			panelClass: 'ModalShow',
			hasBackdrop: false,
		});

		this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
	}
}
