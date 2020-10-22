import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../app.service';
export interface _model {
	Canal: string;
	Category: string;
	Item: string;
	Brand: string;
	Company: string;
	Description: string;
}

@Component({
	selector: 'newNovedad',
	templateUrl: 'newNovedad.html',
	styleUrls: ['newNovedad.css'],
})
export class newNovedad_modal implements OnInit, OnDestroy {
	isGood: boolean = false;
	List_model: _model[] = [];
	ListFiltrDispo: any = [];
	ListFiltrs = {
		Canales: [],
		Categorias: [],
		Submarcas: [],
	};
	ModelNew = {
		Canal: [],
		Category: '',
		Item: '',
		Brand: '',
		Company: '',
		Description: '',
	};
	constructor(
		private _appService: AppService,
		public dialogRef: MatDialogRef<newNovedad_modal>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			Brand: string;
			ListUnique: any;
			// Company: string;
			// Category: string;
			// Canal: string;
			// Brand: string;
		}
	) {
		this.getFiltrDisp();
		// $(document).find('body app-root').toggleClass("blurclass");
	}

	getFiltrDisp() {
		this._appService.getAllFiltrDisp(this.data.Brand, '', '', '', '').subscribe((datas) => {
			this.ListFiltrDispo = datas['ListFiltr'];
			this.ListFiltrs.Canales = this.data.ListUnique(this.ListFiltrDispo, 'Canal');
			this.ListFiltrs.Categorias = this.data.ListUnique(this.ListFiltrDispo, 'Category');
			this.ListFiltrs.Submarcas = this.data.ListUnique(this.ListFiltrDispo, 'Company');
		});
	}

	ok() {
		this.ModelNew.Brand = this.data.Brand;
		this.List_model = [];
		if (
			this.ModelNew.Item != '' &&
			this.ModelNew.Canal.length > 0 &&
			this.ModelNew.Description != '' &&
			this.ModelNew.Category != '' &&
			this.ModelNew.Company != ''
		) {
			this.ModelNew.Canal.forEach((element) => {
				this.List_model.push({
					Canal: element,
					Category: this.ModelNew.Category,
					Description: this.ModelNew.Description,
					Brand: this.ModelNew.Brand,
					Item: this.ModelNew.Item,
					Company: this.ModelNew.Company,
				});
			});

			this._appService.postNewItem(this.List_model).subscribe((datas) => {
				this.isGood = true;
				this.cancel();
			});
		} else {
			this.isGood = false;
		}
	}

	cancel(): void {
		this.dialogRef.close(this.isGood);
	}
	ngOnInit(): void {
		$(document).find('body app-root').addClass('blurclass');
	}
	ngOnDestroy(): void {
		$(document).find('body app-root').removeClass('blurclass');
	}
}
