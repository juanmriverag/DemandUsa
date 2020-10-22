import {
    Component, OnInit, ViewChild, TemplateRef,
    ViewContainerRef,
    AfterViewInit,
    OnDestroy,
    ElementRef,
    Input
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
// import { ColaboracionVComponent } from '../../colaboracion-v/colaboracion-v.component';

@Component({
    selector: 'TablaVts',
    templateUrl: './TablaVts.html',
    styleUrls: ['../../colaboracion-v/colaboracion-v.component.css']
})
export class TablaVts_modal implements AfterViewInit, OnDestroy {

    @Input('Ctrl') _Ctrl; // entrada

    @ViewChild(TemplateRef, { static: false }) _dialogTemplate: TemplateRef<any>;
    private _overlayRef: OverlayRef;
    private _portal: TemplatePortal;

    constructor(private _overlay: Overlay,
         private _viewContainerRef: ViewContainerRef
         ) { }

    ngAfterViewInit() {
        var originElement = $('.MainPadding').get()[0];
        this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
        this._overlayRef = this._overlay.create({
            positionStrategy: this._overlay.position().flexibleConnectedTo(originElement)
                .withPositions([{
                    originX: 'center',
                    originY: 'center',
                    overlayX: 'center',
                    overlayY: 'center'
                }])
                .withFlexibleDimensions()
                .withPush(true)
                .withGrowAfterOpen(),
            // positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            panelClass: 'ModalShow',
            hasBackdrop: false
        });

        this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
    }

    closeDialog() {
        this._overlayRef.detach();
    }

    ngOnDestroy() {
        this._overlayRef.dispose();
    }

    openDialog() {
        this._overlayRef.attach(this._portal);
    }
}
