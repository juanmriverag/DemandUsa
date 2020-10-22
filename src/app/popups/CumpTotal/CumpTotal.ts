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

// import { ColaboracionVComponent } from '../../colaboracion-v/colaboracion-v.component';
const type = GoogleChartPackagesHelper.getPackageForChartName('BarChart');
@Component({
	selector: 'CumpTotal',
	templateUrl: './CumpTotal.html',
	styleUrls: ['../../colaboracion-v/colaboracion-v.component.css'],
})
export class CumpTotal_modal implements AfterViewInit, OnDestroy {
	@Input('Ctrl') _Ctrl; // entrada

	@ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
	private _overlayRef: OverlayRef;
	private _portal: TemplatePortal;

	constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef, private loaderService: ScriptLoaderService) {}

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
