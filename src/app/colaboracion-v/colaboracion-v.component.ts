import {
  Component, OnInit, ViewChild, TemplateRef,
  ViewContainerRef,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { AppComponent } from '../app.component';
import { AppService } from '../app.service';
import { MatTableDataSource, MatDialog, MatSort, Sort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Alert_modal } from '../popups/Alert/Alert';
import { Load_modal } from '../popups/Load/Load';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ResizeEvent } from 'angular-resizable-element';


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
    trigger('detailExpand2', [
      state('collapsed', style({ zIndex: '-10', position: 'absolute', opacity: '0' })),
      state('expanded', style({ zIndex: 'auto', position: 'sticky', opacity: '1' })),
      // state('collapsed', style({ opacity: '0', visibility: 'collapse', transform: 'matrix(1, 0, 0, 1, 0, 55)' })),
      // state('expanded', style({ opacity: '1', visibility: 'visible', transform: 'matrix(1, 0, 0, 1, 0, 0)' })),
      transition('expanded <=> collapsed', animate('225ms linear')),
    ]),

  ],

})
export class ColaboracionVComponent implements OnInit, AfterViewInit, OnDestroy {


  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;
  meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  mesActual = 0;
  displayedColumns = ['canal', 'categoria', 'marca', 'submarca', 'material', 'descripcion', 'mesn_3', 'mesn_2', 'mesn_1', 'promedio', 'mesn1', 'mesn2', 'mesn3', 'precio'];
  displayedColumns2 = ['categoria', 'submarca', 'Fmesn1', 'Fmesn2', 'Fmesn3', 'Pmesn1', 'Pmesn2', 'Pmesn3', 'Cumesn1', 'Cumesn2', 'Cumesn3'];
  displayedColumns3: string[] = [];
  Marcas: [];
  ListColaboracion: any = [];
  ListColaboracion_: any = [];
  ListPresupuestoOrig: any = [];
  ListPresupuesto: any = [];
  ListCopiaColab: any = [];
  EncabColab: any;
  Headerdis1: string[] = [];
  Headerdis2: string[] = [];
  ListFiltrDispo: any = [];
  ListYears: Array<any> = [];
  Mostrar;

  LsitFiltrs = {
    Canales: [],
    Categorias: [],
    Submarcas: []
  }

  @ViewChild(TemplateRef, {static:true}) _dialogTemplate: TemplateRef<any>;
  @ViewChild(MatSort, {static:true}) sort: MatSort;


  constructor(private elRef: ElementRef, private _appComponent: AppComponent, private _appService: AppService, public dialog: MatDialog, private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) {
    this._appComponent.ObtenerNombreUsu();
    this._appComponent.CambioM(true);
    this._appComponent.buildTogglerOff();
    this.load();
    this.obtenerMesActual();
    // this._appComponent.NomTitle(JSON.parse(localStorage.getItem('TitleDocument')));

  }

  load() {
    this.dialog.open(Load_modal, {
      width: '500px',
      backdropClass: 'Transparent-class',
      panelClass: 'Transparent-class2',
      disableClose: true
    });
  }

  //filter columnas a filtrar
  Filtr = {
    Canal: '',
    Categoria: '',
    Marca: '',
    Submarca: ''
  }
  Bus = {
    Canal: '',
    Categoria: '',
    Marca: '',
    Submarca: '',
    Material: '',
    Descripcion: ''
  }
  Bus2 = {
    Categoria: '',
    Submarca: ''
  }
  Bus3 = {
    Year1: '-1',
    Year2: '-1',
    Year3: '-1'
  }
  // validador de inputs de filtros
  Ca: boolean = false;
  Cl: boolean = false;
  Cg: boolean = false;
  Mc: boolean = false;
  Sm: boolean = false;
  Mt: boolean = false;
  Des: boolean = false;

  //funcion validadora 
  SysFiltering(Input: string) {

    if (Input == 'Cl') {
      this.Cl = true;
      this.Ca = false;
      this.Cg = false;
      this.Mc = false;
      this.Sm = false;
      this.Mt = false;
      this.Des = false;

    }
    else if (Input == 'Ca') {
      this.Cl = false;
      this.Ca = true;
      this.Cg = false;
      this.Mc = false;
      this.Sm = false;
      this.Mt = false;
      this.Des = false;

    }
    else if (Input == 'Cg') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = true;
      this.Mc = false;
      this.Sm = false;
      this.Mt = false;
      this.Des = false;

    }
    else if (Input == 'Mc') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = false;
      this.Mc = true;
      this.Sm = false;
      this.Mt = false;
      this.Des = false;

    }
    else if (Input == 'Sm') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = false;
      this.Mc = false;
      this.Sm = true;
      this.Mt = false;
      this.Des = false;

    }
    else if (Input == 'Mt') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = false;
      this.Mc = false;
      this.Sm = false;
      this.Mt = true;
      this.Des = false;

    }
    else if (Input == 'Des') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = false;
      this.Mc = false;
      this.Sm = false;
      this.Mt = false;
      this.Des = true;

    }
    else if (Input == 'MM') {
      this.Cl = false;
      this.Ca = false;
      this.Cg = false;
      this.Mc = false;
      this.Sm = false;
      this.Mt = false;
      this.Des = false;

    }
    else {
      if (this.Cl == true || this.Ca == true || this.Cg == true || this.Mc == true || this.Sm == true || this.Mt == true || this.Des == true) {
        this.Cl = false;
        this.Ca = false;
        this.Cg = false;
        this.Mc = false;
        this.Sm = false;
        this.Mt = false;
        this.Des = false;

      }

    }

  }

  //Construir filtros 

  //aplicador de filtro
  applyFilter() {
    this.ListColaboracion.filter = JSON.stringify(this.Bus);
  }
  applyFilter2() {
    this.ListColaboracion_.filter = JSON.stringify(this.Bus2);
  }
  applyFilter3() {
    this.getPresupuesto();
  }
  applyFilter4() {
    for (let i = 0; i < this.ListYears.length; i++) {
      const element = this.ListYears[i];
      var val = '-1';
      if (element.checked) {
        val = element.year;
      }
      this.Bus3['Year' + (i + 1)] = val;
    }
    this.ListPresupuesto.filter = JSON.stringify(this.Bus3);
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

      this.ListCopiaColab = data['ListColabs'];
      this.EncabColab = this.ListCopiaColab[0];
      this.applyFilter();
      //---------------------------------------------
      // this.ConstFiltr();
      this.getColaboracion_();

      // this.dialog.closeAll();
    });
  }

  getColaboracion_() {

    this._appService.getAllColaboracion_(this.Bus.Marca)
      .subscribe(data => {
        this.ListColaboracion_ = new MatTableDataSource(data['ListColabs_']);
        this.ListColaboracion_.filterPredicate = this.tableFilter2();
        this.getPresupuesto();
      });
  }

  getPresupuesto() {
    this._appService.getAllPresupuesto(this.Filtr.Canal, this.Filtr.Categoria, this.Bus.Marca, this.Filtr.Submarca)
      .subscribe(data => {
        this.ListPresupuestoOrig = data['ListPresu'];
        this.dialog.closeAll();
        this.getFiltrDisp();
        this.managePresu();
      });
  }

  getFiltrDisp() {
    this._appService.getAllFiltrDisp(this.Bus.Marca, this.Filtr.Canal, this.Filtr.Categoria, this.Filtr.Submarca)
      .subscribe(data => {
        this.ListFiltrDispo = data['ListFiltr'];
        this.LsitFiltrs.Canales = this.ListUnique(this.ListFiltrDispo, 'Canal');
        this.LsitFiltrs.Categorias = this.ListUnique(this.ListFiltrDispo, 'Categoria');
        this.LsitFiltrs.Submarcas = this.ListUnique(this.ListFiltrDispo, 'Submarca');

      });
  }

  ListUnique(List, Column: string) {
    var Uniques = List.map(data => data[Column]);
    return Uniques.filter((x, i, a) => x && a.indexOf(x) === i);
  }

  managePresu() {
    this.Headerdis1 = [];
    this.Headerdis2 = [];
    this.displayedColumns3 = [];
    var cum = 0;
    var mag = this.ListPresupuestoOrig;

    this.ListYears = this.ListUnique(mag, 'Year').map(function (item) {
      var obj = { year: item, checked: true };
      return obj;
    });

    // this.ListYears.push({ year: 2020, checked: true })


    for (var Column in mag[0]) {
      if (Column != 'Id') {
        if (Column.indexOf("M") == -1) {
          this.Headerdis1.push(Column);

        } else {
          this.Headerdis2.push(Column);
        }
        this.displayedColumns3.push(Column);
      }
    }
    this.ListPresupuesto = new MatTableDataSource(this.ListPresupuestoOrig);
    this.ListPresupuesto.sort = this.sort;
    this.ListPresupuesto.filterPredicate = this.tableFilter3();
    this.applyFilter4();
  

  }

  sortData(sort: Sort) {
    const data = this.ListPresupuestoOrig.slice();
    if (!sort.active || sort.direction === '') {
      this.ListPresupuesto = data;
      return;
    }

    this.ListPresupuesto = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Year': return this.compare(a.Year, b.Year, isAsc);
        case 'Variable': return this.compare(a.Id, b.Id, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  //generador del filterPredicate del MatTableDataSource
  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Canal.toLowerCase().indexOf(searchTerms.Canal.toLowerCase()) !== -1
        && data.Categoria.toLowerCase().indexOf(searchTerms.Categoria.toLowerCase()) !== -1
        && data.Marca.toLowerCase().indexOf(searchTerms.Marca.toLowerCase()) !== -1
        && data.Submarca.toLowerCase().indexOf(searchTerms.Submarca.toLowerCase()) !== -1
        && data.Material.toLowerCase().indexOf(searchTerms.Material.toLowerCase()) !== -1
        && data.Descripcion.toLowerCase().indexOf(searchTerms.Descripcion.toLowerCase()) !== -1

    }
    return filterFunction;
  }

  tableFilter2(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Categoria.toLowerCase().indexOf(searchTerms.Categoria.toLowerCase()) !== -1
        && data.Submarca.toLowerCase().indexOf(searchTerms.Submarca.toLowerCase()) !== -1
    }
    return filterFunction;
  }
  tableFilter3(): (data: any, filter: string) => boolean {
    let filterFunction = function (data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.Year.toString().indexOf(searchTerms.Year1.toString()) !== -1
        || data.Year.toString().indexOf(searchTerms.Year2.toString()) !== -1
        || data.Year.toString().indexOf(searchTerms.Year3.toString()) !== -1
    }
    return filterFunction;
  }
  PostPronost(_model) {
    _model.Mesn1 = +_model.Mesn1;
    _model.Mesn2 = +_model.Mesn2;
    _model.Mesn3 = +_model.Mesn3;

    this._appService.putColab(_model).subscribe(data => {
      this.getColaboracion_();
    });
  }
  susKeyEvent(keyEvent, _model, IdInp, numI) {
    var Id = '#v';

    var index = this.ListColaboracion.data.indexOf(_model);

    if (keyEvent.which === 39 || keyEvent.which === 13) {
      Id = Id + (IdInp + 1);
      this.PostPronost(_model);
      $(Id).focus();
    }
    else if (keyEvent.which === 37) {
      Id = Id + (IdInp - 1);
      $(Id).focus();
    }
    else if (keyEvent.which === 40) {
      Id = Id + (IdInp + 3);
      $(Id).focus();
    }
    else if (keyEvent.which === 38) {
      Id = Id + (IdInp - 3);
      $(Id).focus();
    }
    else if (keyEvent.which >= 65 && keyEvent.which <= 90 && keyEvent.which != 67 && keyEvent.which != 86) {
      if (index != -1) {
        if (numI == 1) {
          this.ListColaboracion.data[index].Mesn1 = this.ListColaboracion.data[index].Mesn1.substring(0, this.ListColaboracion.data[index].Mesn1.length - 1);
        }
        else if (numI == 2) {
          this.ListColaboracion.data[index].Mesn2 = this.ListColaboracion.data[index].Mesn2.substring(0, this.ListColaboracion.data[index].Mesn2.length - 1);
        }
        else if (numI == 3) {
          this.ListColaboracion.data[index].Mesn3 = this.ListColaboracion.data[index].Mesn3.substring(0, this.ListColaboracion.data[index].Mesn3.length - 1);
        }

      }
    }

  }



  //obtiene mes del day -1 cuantos dias de le suma o resta
  obtenerMes(day: number) {
    if (day != null) {
      var d = new Date();
      d.setMonth(d.getMonth() + day, 7);
      return this.meses[d.getMonth()];
    }
    return 'none';
  }
  //obtiene mes del nummes
  obtenerMesO(nummes: number) {
    if (nummes != null) {
      return this.meses[nummes];
    }
    return 'none';
  }

  obtenerMesActual() {
    var d = new Date();
    this.mesActual = d.getMonth();
  }

  //obtiene año del string 'yyyy.mm'
  obtenerYear(Syear: string) {
    if (Syear) {
      var Nyear = +Syear.slice(0, 4);
      return Nyear;
    }
    return 'none';
  }

  getTotal(val: string) {
    var copy = this.ListColaboracion_.filteredData;
    if (copy) {
      return (copy.map(t => t[val]).reduce((acc, value) => acc + value, 0));
    }
    return 0;
  }



  getCumplim_(val1, val2) {
    var div = (val1 / val2);
    if (val1 == 0 || val2 == 0) { div = 0; }
    return (div * 100);
  }

  onResizeEnd(event: ResizeEvent): void {
    var originElement = $('.Acumulados-Dialog').get();
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
  }
  closeDialog() {
    this._overlayRef.detach();
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  ngOnInit() {
    this.Mostrar = this._appComponent.Mostrar;
    var Marc: string = JSON.parse(localStorage.getItem('TitleDocument'));
    this.Bus.Marca = Marc.toLowerCase();
    this._appComponent.NomTitle(Marc);

    $("app-colaboracion-v").addClass('js-pscroll');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfect-scrollbar.min.js');
    $.getScript('../../assets/vendor/perfect-scrollbar/perfectEject.js')
    this.getMarcas();
    this.getColaboracion();


  }

  ngAfterViewInit() {
    $(".T2 tbody").addClass('js-pscroll');
    $(".T2 tbody").addClass('tb');

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
      backdropClass: 'Transparent-class2',
      hasBackdrop: false
    });

    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
  }

}
