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
	Inject,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';

// import { ColaboracionVComponent } from '../../colaboracion-v/colaboracion-v.component';
// const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
@Component({
	selector: 'itemChartP',
	templateUrl: './itemChartP.html',
	styleUrls: ['../../colaboracion-v/colaboracion-v.component.css'],
})
export class itemChartP_modal implements AfterViewInit, OnDestroy {
	dataChartItem: any; // entrada
	_modelItem: {};
	loading: boolean = true;

	@ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
	private _overlayRef: OverlayRef;
	private _portal: TemplatePortal;

	typechart = 'LineChart';
	columnNames: string[] = [];
	dataChart = [];

	options = {
		title: '',
		legend: { position: 'in', textStyle: { fontSize: 10 } },

		width: 450,
		height: 300,
		// curveType: 'function',
		selectionMode: 'multiple',
		tooltip: { trigger: 'selection', textStyle: { fontSize: 10 } },
		aggregationTarget: 'series',
		hAxis: { slantedText: true, slantedTextAngle: 90 },
		// vAxis: { viewWindow: { min: 1 } },
		series: {
			0: { color: '#2D4F5C' },
			1: { color: '#ED1C23' },
			// 2: { color: '#A99075' },
			// 3: { type: 'line', color: '#E8BC89' },
			// 3: { type: 'line', color: '#5C4A36' },
		},
		// chartArea: { left: 50, top: 15, winth: '150%' },
		chartArea: { width: '95%', height: '80%', top: 5, left: 35 },
		// legend: { position: 'bottom' }
	};

	constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) {}

	//content
	closeDialog() {
		this._overlayRef.detach();
	}

	ngOnDestroy() {
		this._overlayRef.dispose();
	}

	refresh(data) {
		this.dataChartItem = data;
		this.crear();
	}

	openDialog(data, _model) {
		this.loading = true;
		this.dataChartItem = data;
		this._modelItem = _model;
		this._overlayRef.attach(this._portal);
		this.crear();
	}

	crear() {
		this.columnNames = [];
		this.dataChart = [];
		this.columnNames.push('Date');
		this.columnNames.push('Sales');
		this.columnNames.push('ForeCast');

		this.dataChartItem.forEach((element) => {
			this.dataChart.push([element.Date, element.Sale, element.ForeCast]);
		});

		// this.data.listCharts.forEach((element) => {
		// 	this.dataChart.push([element.Date, element.Sale, element.ForeCast]);
		// });
	}

	// isnull(val) {
	// 	if (val == 0) {
	// 		return null;
	// 	} else {
	// 		return val;
	// 	}
	// }
	onReady(e) {
		this.loading = false;
	}

	ngOnInit() {}
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
