import { NgModule } from '@angular/core';
//Componentes a importar
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
    exports: [DragDropModule,PortalModule],
})
export class CDKModule { }