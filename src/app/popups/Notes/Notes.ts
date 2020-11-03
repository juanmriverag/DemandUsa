import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TypeNote } from 'src/app/interfaces/TypeNote';
import { AppService } from 'src/app/app.service';

@Component({
	selector: 'Notes',
	templateUrl: 'Notes.html',
	styleUrls: ['Notes.css'],
})
export class Notes_modal implements OnInit, OnDestroy {
	Territory: string = '';
	Item: string = '';
	List_Notes: TypeNote[];

	constructor(
		public appService: AppService,
		public dialogRef: MatDialogRef<Notes_modal>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			Notes: TypeNote[];
		}
	) {
		this.List_Notes = this.data.Notes;
	}
	delete(Note: TypeNote) {
		this.appService.postNote(Note, 3).subscribe((rest) => {
			this.dialogRef.close(true);
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
