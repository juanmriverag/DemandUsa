import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';


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
  ],
})
export class ColaboracionVComponent implements OnInit {
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  displayedColumns = ['canal', 'marca', 'material', 'descripcion', 'H1', 'H2', 'H3', 'mes_1', 'mes_2', 'mes_3', 'promedio'];
  Marcas: [];
  ListColaboracion: any = [];
  ListCopiaColab: any = [];
  EncabColab: any;

  // dataSource = new MatTableDataSource<any>(this.ListColaboracion);
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  constructor(private _appComponent: AppComponent, private _appService: AppService) {

  }


  //filter
  Bus = {
    Material: ''
  }

  R: boolean = false;
  M: boolean = false;
  RM: boolean = false;
  F: boolean = false;
  MM: boolean = false;

  SysFiltering(Input: string) {

    if (Input == 'R') {
      this.R = true;
      this.M = false;
      this.RM = false;
      this.F = false;
      this.MM = false;
    }
    else if (Input == 'M') {
      this.R = false;
      this.M = true;
      this.RM = false;
      this.F = false;
      this.MM = false;
    }
    else if (Input == 'RM') {
      this.R = false;
      this.M = false;
      this.RM = true;
      this.F = false;
      this.MM = false;
    }
    else if (Input == 'F') {
      this.R = false;
      this.M = false;
      this.RM = false;
      this.F = true;
      this.MM = false;
    }
    else if (Input == 'MM') {
      this.R = false;
      this.M = false;
      this.RM = false;
      this.F = false;
      this.MM = true;
    }
    else {
      if (this.R == true || this.M == true || this.RM == true || this.F == true || this.MM == true) {
        this.R = false;
        this.M = false;
        this.RM = false;
        this.F = false;
        this.MM = false;
      }

    }

  }

  applyFilter() {
    this.ListColaboracion.filter = JSON.stringify(this.Bus);
  }

  getMarcas() {
    this._appService.getAllMarca().subscribe(data => {
      this.Marcas = data['ListMarcas'];

    });
  }

  getColaboracion() {
    this._appService.getAllColaboracion().subscribe(data => {
      this.ListColaboracion = new MatTableDataSource(data['ListColabs']);
      this.ListColaboracion.filterPredicate = this.tableFilter();
      this.ListColaboracion.paginator = this.paginator;
      this.ListColaboracion._paginator._intl.itemsPerPageLabel = "Items por página :";
      this.ListCopiaColab = data['ListColabs'];
      this.EncabColab = this.ListCopiaColab[0];

    });
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Material.toString().toLowerCase().indexOf(searchTerms.Material) !== -1
      // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
      // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
      // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    }
    return filterFunction;
  }

  obtenerMes(Smes: string) {
    if (Smes) {
      var Nmes = +Smes.slice(5);
      return this.meses[Nmes - 1];
    }

    return 'none';
  }

  obtenerYear(Syear: string) {
    if (Syear) {
      var Nyear = +Syear.slice(0, 4);
      return Nyear;
    }

    return 'none';
  }


  ngOnInit() {
    this._appComponent.ObtenerNombreUsu();
    this._appComponent.CambioM(true);
    this._appComponent.buildTogglerOff();
    $.getScript('../../assets/js/Menu.js');
    $("app-colaboracion-v").addClass('js-pscroll');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfectEject.js')
    this.getMarcas();
    this.getColaboracion();

  }


}
