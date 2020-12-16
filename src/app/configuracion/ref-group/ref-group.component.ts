import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AppService } from 'src/app/app.service';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { newRefGroup_modal } from '../../popups/newRefGroup/newRefGroup';
@Component({
	selector: 'app-ref-group',
	templateUrl: './ref-group.component.html',
	styleUrls: ['./ref-group.component.css'],
})
export class RefGroupComponent implements OnInit {
	ListItems: any = [];
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	constructor(private appService: AppService, public dialog: MatDialog) {}

	displayedColumns: string[] = ['id', 'item_parent', 'item_child', 'op'];

	callPost(refParent: number, refChild: number, op: number) {
		this.appService.postrefGroup(refParent, refChild, op).subscribe((data) => {
			this.ListItems = new MatTableDataSource(data['Items']);
			this.ListItems.sort = this.sort;
		});
	}

	add() {
		const dialogRef = this.dialog.open(newRefGroup_modal, {
			width: '600px',
			panelClass: 'NewNovedadClass',
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.ListItems = result;
			}
		});
	}

	delete(_model) {
		this.callPost(_model.refParent, _model.refChild, 2);
	}

	ngOnInit() {
		this.callPost(0, 0, 0);
	}
}
