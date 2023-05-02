import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accommodation-dialog',
  templateUrl: './accommodation-dialog.component.html',
  styleUrls: ['./accommodation-dialog.component.css']
})
export class AccommodationDialogComponent  {
  constructor( public dialogRef : MatDialogRef<AccommodationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
