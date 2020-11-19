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
	OnChanges,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ScriptLoaderService, GoogleChartPackagesHelper } from 'angular-google-charts';
import { AppService } from '../../app.service';
import { using } from 'rxjs';

// import { ColaboracionVComponent } from '../../colaboracion-v/colaboracion-v.component';
const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
@Component({
	selector: 'CumpTotal',
	templateUrl: './CumpTotal.html',
	styleUrls: ['../../colaboracion-v/colaboracion-v.component.css'],
})
export class CumpTotal_modal implements OnInit, AfterViewInit, OnDestroy {
	@Input('Ctrl') _Ctrl;
	@ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
	private _overlayRef: OverlayRef;
	private _portal: TemplatePortal;

	Filtr = {
		Territory: null,
		Company: null,
		Brand: null,
	};
	ListFiltrs = {
		Territories: [],
		Companies: [],
		Brands: [],
	};
	ListTerCompliance: any;
	ListCompCompliance: any;
	ListBrandCompliance: any;
	constructor(
		private _overlay: Overlay,
		private _viewContainerRef: ViewContainerRef,
		private loaderService: ScriptLoaderService,
		public appService: AppService
	) {}

	displayedColumns = [
		'territory',
		'FMonthN1',
		'FMonthN2',
		'FMonthN3',
		'PMonthN1',
		'PMonthN2',
		'PMonthN3',
		'CuMonthN1',
		'CuMonthN2',
		'CuMonthN3',
	];
	columnsHeader1 = ['space1', 'Forecast_', 'Presupuesto_', 'Compliance'];

	//content
	closeDialog() {
		this._overlayRef.detach();
	}

	ngOnDestroy() {
		this._overlayRef.dispose();
	}

	openDialog() {
		this._overlayRef.attach(this._portal);
		// console.log(this._Ctrl.ListTerCompliance);
	}

	getFiltros() {
		this.appService.getfiltr2(this.Filtr.Territory, this.Filtr.Company, this.Filtr.Brand).subscribe((data) => {
			const _data = data['ListFiltr2'];
			this.ListFiltrs.Territories = this.appService.ListUnique(_data, 'Territory');
			this.ListFiltrs.Companies = this.appService.ListUnique(_data, 'Company');
			this.ListFiltrs.Brands = this.appService.ListUnique(_data, 'Brand');
		});
	}

	getCump() {
		this.appService.getAllCompTotal(this.Filtr.Territory, this.Filtr.Company, this.Filtr.Brand).subscribe((data) => {
			this.ListTerCompliance = data['ListTerCompliance'];
			this.ListCompCompliance = data['ListCompaCompliance'];
			this.ListBrandCompliance = data['ListBrandCompliance'];
		});
	}

	gettotalTerritorySummary(val: string) {
		var copy = this.ListTerCompliance;
		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	gettotalCompanySummary(val: string) {
		var copy = this.ListCompCompliance;
		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	gettotalBrandSummary(val: string) {
		var copy = this.ListBrandCompliance;
		if (copy) {
			return copy.map((t) => t[val]).reduce((acc, value) => acc + value, 0);
		}
		return 0;
	}

	applyFilter() {
		this.getCump();
		this.getFiltros();
	}
	ngOnInit() {
		this.getFiltros();
		this.getCump();
	}

	ngAfterViewInit() {
		//localhost:4200/src/assets/vendor/perfect-scrollbar/perfect-scrollbar.css
		http: var originElement = $('.MainPadding').get()[0];
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
