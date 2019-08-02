import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'Load',
  templateUrl: 'Load.html',
})
export class Load_modal {

  constructor(
    public dialogRef: MatDialogRef<Load_modal>,
    @Inject(MAT_DIALOG_DATA) public data: {
      
    }) { }



 }