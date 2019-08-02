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
  MatSortModule
} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule,MatInputModule,MatDialogModule,MatSidenavModule,MatExpansionModule,MatSelectModule,MatTableModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule ],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule,MatInputModule,MatDialogModule,MatSidenavModule,MatExpansionModule,MatSelectModule,MatTableModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule ],
})
export class AMaterialModule { }