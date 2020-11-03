import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypeNote } from 'src/app/interfaces/TypeNote';
import { AppService } from 'src/app/app.service';

@Component({
	selector: 'Note',
	templateUrl: 'Note.html',
	styleUrls: ['Note.css'],
})
export class Note_modal implements OnInit, OnDestroy {
	_Note: TypeNote = {
		IdNote: 0,
		Territory: '',
		Item: '',
		Creator: '',
		CreationDate: new Date(),
		Title: '',
		Content: '',
	};

	BtnOk: string = '';

	constructor(
		public appService: AppService,
		public dialogRef: MatDialogRef<Note_modal>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			item: any;
			_Note: TypeNote;
			Creator: string;
		}
	) {
		this.selectData();
	}

	selectData() {
		if (this.data._Note) {
			this._Note = this.data._Note;
			this.BtnOk = 'Update';
		} else {
			this._Note.Territory = this.data.item.Territory;
			this._Note.Item = this.data.item.Item;
			this._Note.Creator = this.data.Creator;
			this.BtnOk = 'Add';
		}
	}

	ok() {
		var op = 1;
		if (this.data._Note) {
			op = 2;
		} else {
			op = 1;
		}

		this.appService.postNote(this._Note, op).subscribe((rest) => {
			this.dialogRef.close(this._Note);
		});
	}

	exit(): void {
		this.dialogRef.close();
	}
	ngOnInit(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
	ngOnDestroy(): void {
		$(document).find('body app-root').toggleClass('blurclass');
	}
}
