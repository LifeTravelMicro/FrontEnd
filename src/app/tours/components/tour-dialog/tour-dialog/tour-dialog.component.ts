import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-tour-dialog',
  templateUrl: './tour-dialog.component.html',
  styleUrls: ['./tour-dialog.component.css']
})
export class TourDialogComponent  {

  constructor(public dialogRef : MatDialogRef<TourDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


}
