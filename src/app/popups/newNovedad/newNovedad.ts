import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../app.service';
export interface _model {
	Territory: string;
	Client: string;
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
		Clients: [],
		Divisions: [],
		Brands: [],
		Companies: [],
	};
	ModelNew = {
		Client: '',
		Division: '',
		Item: '',
		Brand: '',
		Company: '',
		Description: '',
	};
	constructor(
		private appService: AppService,
		public dialogRef: MatDialogRef<newNovedad_modal>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			Territory: string;
			// ListUnique: any;
			// Company: string;
			// Category: string;
			// Canal: string;
			// Brand: string;
		}
	) {
		this.refresh();
		this.getFiltrDisp();
		// $(document).find('body app-root').toggleClass("blurclass");
	}

	refresh() {
		this.ModelNew = {
			Client: '',
			Division: '',
			Item: '',
			Brand: '',
			Company: '',
			Description: '',
		};
	}

	getFiltrDisp() {
		this.appService.getAllFiltrDisp(this.data.Territory, '', '', '', '').subscribe((datas) => {
			this.ListFiltrDispo = datas['ListFiltr'];
			this.ListFiltrs.Clients = this.appService.ListUnique(this.ListFiltrDispo, 'Client');
			this.ListFiltrs.Divisions = this.appService.ListUnique(this.ListFiltrDispo, 'Category');
			this.ListFiltrs.Brands = this.appService.ListUnique(this.ListFiltrDispo, 'Brand');
			this.ListFiltrs.Companies = this.appService.ListUnique(this.ListFiltrDispo, 'Company');
		});
	}

	ok() {
		this.List_model = [];
		if (
			this.ModelNew.Item != '' &&
			this.ModelNew.Client != '' &&
			this.ModelNew.Description != '' &&
			this.ModelNew.Division != '' &&
			this.ModelNew.Company != ''
		) {
			this.List_model.push({
				Territory: this.data.Territory,
				Client: this.ModelNew.Client,
				Category: this.ModelNew.Division,
				Description: this.ModelNew.Description,
				Brand: this.ModelNew.Brand,
				Item: this.ModelNew.Item,
				Company: this.ModelNew.Company,
			});

			this.appService.postNewItem(this.List_model).subscribe((datas) => {
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
