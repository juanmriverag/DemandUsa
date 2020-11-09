import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
//url
import { BDUrl } from './constan';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

// import { Http, Response, Headers, RequestOptions } from "@angular/http";
// import { HttpClient } from '@angular/common/http';

// import "rxjs/add/operator/map";

@Injectable({
	providedIn: 'root',
})
export class AppService {
	@Output() change: EventEmitter<null> = new EventEmitter();
	meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	constructor(private router: Router, private cookies: CookieService, private httpclient: HttpClient, private urlBase: BDUrl) {}

	private handleError(error: HttpErrorResponse) {
		localStorage.clear();
		location.reload();
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}

	//--------------------------------------> MetodsPu <------------------------------------------------
	//lisUnique
	ListUnique(List: [], Column: string) {
		var Uniques = List.map((data) => data[Column]);
		return Uniques.filter((x, i, a) => x && a.indexOf(x) === i);
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
	//--------------------------------------> MetodsPu <------------------------------------------------

	//metodo

	postPTLogin(credencialesEncriptadas: any, modelUser: any, modelPass: any) {
		return this.httpclient.post(this.urlBase.url + 'Login', null, {
			params: { modelEncrip: credencialesEncriptadas, modelUser: modelUser, modelPass: modelPass },
		});
	}
	getEstadoUs(IDUsu: any) {
		return this.httpclient.get<any[]>(this.urlBase.url + 'EstadoUs', { params: { PersonaId: IDUsu } });
	}
	getMenuxRol(rolID: any) {
		return this.httpclient.get<any[]>(this.urlBase.url + 'Menu/' + rolID).pipe(catchError(this.handleError));
	}
	getAllMarca() {
		return this.httpclient.get<any[]>(this.urlBase.url + 'Brand');
	}
	getAllDMForeCast() {
		return this.httpclient.get<any[]>(this.urlBase.url + 'DMForeC');
	}
	getAllDMForeCastXTerritory(Territory: string, Client: string) {
		return this.httpclient.get<any[]>(this.urlBase.url + 'DMForeC/' + Territory + '/' + Client);
	}
	getAllDMForeCast_(Territory: string, Client: string) {
		return this.httpclient.get<any[]>(this.urlBase.url + 'DMForeC_/' + Territory + '/' + Client);
	}
	getAllCompTotal(Territory: string, Company: string, Brand: string) {
		var params = new HttpParams();
		params = params.append('Territory', Territory);
		params = params.append('Company', Company);
		params = params.append('Brand', Brand);
		return this.httpclient.get<any[]>(this.urlBase.url + 'TerCompliance', { params: params });
	}
	postCargarSap(IdTypeDoc: any, _modelList: any) {
		var httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				// 'Content-Type': undefined
			}),
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
	getAllBudget(Client: string, Category: string, Territory: string, Company: string, Brand: string) {
		// Initialize Params Object
		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('Client', Client);
		params = params.append('Category', Category);
		params = params.append('Territory', Territory);
		params = params.append('Company', Company);
		params = params.append('Brand', Brand);
		return this.httpclient.get<any[]>(this.urlBase.url + 'Presu', { params: params });
	}
	getForeChart(Client: string, Category: string, Territory: string, Company: string, Brand: string) {
		// Initialize Params Object
		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('Territory', Territory);
		params = params.append('Category', Category);
		params = params.append('Company', Company);
		params = params.append('Client', Client);
		params = params.append('Brand', Brand);
		return this.httpclient.get<any[]>(this.urlBase.url + 'ForeChart', { params: params });
	}
	getAllCanales() {
		return this.httpclient.get<any[]>(this.urlBase.url + 'Canal');
	}
	getAllFiltrDisp(Territory: string, Client: string, Category: string, Company: string, Brand: string) {
		// Initialize Params Object
		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('Territory', Territory);
		params = params.append('Category', Category);
		params = params.append('Company', Company);
		params = params.append('Client', Client);
		params = params.append('Brand', Brand);
		return this.httpclient.get<any[]>(this.urlBase.url + 'FiltrDisp', { params: params });
	}
	getfiltr2(Territory: string, Company: string, Brand: string) {
		// Initialize Params Object
		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('Territory', Territory);
		params = params.append('Company', Company);
		params = params.append('Brand', Brand);
		return this.httpclient.get<any[]>(this.urlBase.url + 'FiltrDisp2', { params: params });
	}
	postNewItem(_models: any) {
		let bodystr = new FormData();
		bodystr.append('ListModel', JSON.stringify(_models));
		return this.httpclient.post(this.urlBase.url + 'Item', bodystr);
	}
	putForeC(_model: any) {
		let bodystr = new FormData();
		bodystr.append('Modelo', JSON.stringify(_model));
		return this.httpclient.put(this.urlBase.url + 'DMForeC', bodystr);
	}
	deleteColab(Territory: string, Item: string) {
		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('Territory', Territory);
		params = params.append('Item', Item);

		return this.httpclient.delete(this.urlBase.url + 'Item', { params: params });
	}
	putPrices(_model: any) {
		let bodystr = new FormData();
		bodystr.append('Modelo', JSON.stringify(_model));
		return this.httpclient.put(this.urlBase.url + 'Prices', bodystr);
	}
	getAllUsers() {
		return this.httpclient.get<any[]>(this.urlBase.url + 'UManager');
	}
	postUser(_model: any) {
		let bodystr = new FormData();
		bodystr.append('Modelo', JSON.stringify(_model));
		return this.httpclient.post(this.urlBase.url + 'UManager', bodystr);
	}
	putUsers(_model: any) {
		let bodystr = new FormData();
		bodystr.append('Modelo', JSON.stringify(_model));
		return this.httpclient.put(this.urlBase.url + 'UManager', bodystr);
	}

	//Other methods with services

	//Notes
	getNotes(territory: string) {
		let params = new HttpParams();
		params = params.append('Territory', territory);
		return this.httpclient.get<any[]>(this.urlBase.url + 'Notes', { params: params });
	}
	postNote(_Note, Option) {
		let bodystr = new FormData();
		bodystr.append('Note', JSON.stringify(_Note));
		bodystr.append('Option', Option);
		return this.httpclient.post(this.urlBase.url + 'Note', bodystr);
	}

	//ItemChar
	getItemChart(Territory: string, Client: string, Item: string) {
		// Initialize Params Object
		let params = new HttpParams();
		// Begin assigning parameters
		params = params.append('Territory', Territory);
		params = params.append('Client', Client);
		params = params.append('Item', Item);
		return this.httpclient.get<any[]>(this.urlBase.url + 'getItemChart', { params: params });
	}
}
