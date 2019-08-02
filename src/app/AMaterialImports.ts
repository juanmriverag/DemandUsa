import { NgModule } from '@angular/core';
//Componentes a importar
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatDialogModule,
  MatSidenavModule,
  MatExpansionModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTooltipModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule,MatInputModule,MatDialogModule,MatSidenavModule,MatExpansionModule,MatSelectModule,MatTableModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule,MatTooltipModule ],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule,MatInputModule,MatDialogModule,MatSidenavModule,MatExpansionModule,MatSelectModule,MatTableModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule,MatTooltipModule ],
})
export class AMaterialModule { }