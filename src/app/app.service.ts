import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//url
import { BDUrl } from './constan';



// import { Http, Response, Headers, RequestOptions } from "@angular/http";
// import { HttpClient } from '@angular/common/http';


// import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient: HttpClient, private urlBase: BDUrl) {

  }
  //metodo

  postPTLogin(credencialesEncriptadas: any, modelUser: any, modelPass: any) {
    return this.httpclient.post(this.urlBase.url + 'Login', null, { params: { modelEncrip: credencialesEncriptadas, modelUser: modelUser, modelPass: modelPass } });
  }
  getEstadoUs(IDUsu: any) {
    return this.httpclient.get<any[]>(this.urlBase.url + 'EstadoUs', { params: { PersonaId: IDUsu } });
  }
  getMenuxRol(rolID: any) {
    return this.httpclient.get<any[]>(this.urlBase.url + 'Menu/' + rolID);
  }
  getAllMarca() {
    return this.httpclient.get<any[]>(this.urlBase.url + 'Marca');
  }
  getAllColaboracion() {
    return this.httpclient.get<any[]>(this.urlBase.url + 'Colab');
  }
  getAllColaboracion_(marca: string) {
    return this.httpclient.get<any[]>(this.urlBase.url + 'Colab_/' + marca);
  }
  postCargarSap(IdTypeDoc: any, _modelList: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Content-Type': undefined
      })
    };
    // var dto = {
    //   IdTypeDoc: IdTypeDoc
    //   , ListDoc: _modelList
    // };
    let bodystr = new FormData();
    bodystr.append('IdTypeDoc', IdTypeDoc);
    bodystr.append('ListDoc', JSON.stringify(_modelList));


    return this.httpclient.post(this.urlBase.url + 'Cargarsap', bodystr);
  }
  getAllPresupuesto(canal: string, categ: string, marca: string, submarca: string, ) {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('marca', marca);
    params = params.append('canal', canal);
    params = params.append('categoria', categ);
    params = params.append('submarca', submarca);
    return this.httpclient.get<any[]>(this.urlBase.url + 'Presu', { params: params });
  }
  getAllFiltrDisp(marca: string, canal: string, categ: string, submarca: string, ) {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('marca', marca);
    params = params.append('canal', canal);
    params = params.append('categoria', categ);
    params = params.append('submarca', submarca);
    return this.httpclient.get<any[]>(this.urlBase.url + 'FiltrDisp', { params: params });
  }
  putColab(_model: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    let bodystr = new FormData();
    bodystr.append('Modelo', JSON.stringify(_model));


    return this.httpclient.put(this.urlBase.url + 'Colab', bodystr);
  }
}
