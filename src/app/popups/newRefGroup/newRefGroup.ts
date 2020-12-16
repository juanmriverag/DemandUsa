import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from '../../app.service';

export interface _model {
	refParent: number;
	refChild: number;
}

@Component({
	selector: 'newRefGroup',
	templateUrl: 'newRefGroup.html',
	styleUrls: ['newRefGroup.css'],
})
export class newRefGroup_modal implements OnInit, OnDestroy {
	ModelNew: _model = {
		refParent: 0,
		refChild: 0,
	};

	constructor(private appService: AppService, public dialogRef: MatDialogRef<newRefGroup_modal>) {}

	ok() {
		this.appService.postrefGroup(this.ModelNew.refParent, this.ModelNew.refChild, 1).subscribe((data) => {
			this.dialogRef.close(data['Items']);
		});
	}

	cancel(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		$(document).find('body app-root').addClass('blurclass');
	}
	ngOnDestroy(): void {
		$(document).find('body app-root').removeClass('blurclass');
	}
}
