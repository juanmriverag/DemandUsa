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
const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
@Component({
	selector: 'itemChartP',
	templateUrl: './itemChartP.html',
	styleUrls: ['../../colaboracion-v/colaboracion-v.component.css'],
})
export class itemChartP_modal implements AfterViewInit, OnDestroy {
	dataChartItem: any; // entrada

	@ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
	private _overlayRef: OverlayRef;
	private _portal: TemplatePortal;

	typechart = 'ComboChart';
	columnNames: string[] = [];
	dataChart = [];

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
		// chartArea: { width: '70%', height: '90%' },
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

	openDialog(data) {
		this.dataChartItem = data;
		this._overlayRef.attach(this._portal);
		this.crear();
	}

	crear() {
		this.columnNames = [];
		this.dataChart = [];
		this.columnNames.push('Date');
		this.columnNames.push('Sales');
		this.columnNames.push('ForeCast');
		debugger;
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
