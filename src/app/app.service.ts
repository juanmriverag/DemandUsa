import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//url
import { BDUrl} from './constan';



// import { Http, Response, Headers, RequestOptions } from "@angular/http";
// import { HttpClient } from '@angular/common/http';


// import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient : HttpClient ,private urlBase : BDUrl) { 
     
  }
  //metodo
 
  postPTLogin(credencialesEncriptadas : any , modelUser : any , modelPass : any){
    return this.httpclient.post(this.urlBase.url + 'Login' , null , { params : {modelEncrip: credencialesEncriptadas, modelUser : modelUser, modelPass : modelPass}});
  }
  getEstadoUs(IDUsu : any){
    return this.httpclient.get<any[]>(this.urlBase.url + 'EstadoUs' ,  { params : {PersonaId: IDUsu}});
  }
  getMenuxRol(rolID : any){
    return this.httpclient.get<any[]>(this.urlBase.url + 'Menu/' +  rolID );
  }
  getAllMarca(){
    return this.httpclient.get<any[]>(this.urlBase.url + 'Marca');
  }
  getAllColaboracion(){
    return this.httpclient.get<any[]>(this.urlBase.url + 'Colab');
  }
}
