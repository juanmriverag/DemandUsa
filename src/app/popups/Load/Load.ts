import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'Load',
  templateUrl: 'Load.html',
})
export class Load_modal implements OnInit,OnDestroy  {

  constructor(
    public dialogRef: MatDialogRef<Load_modal>,
    @Inject(MAT_DIALOG_DATA) public data: {

    }) { }


    ngOnInit(): void {
      $(document).find('body app-root').toggleClass("blurclass");
    }
    ngOnDestroy(): void{
      $(document).find('body app-root').toggleClass("blurclass");
    }
 }
