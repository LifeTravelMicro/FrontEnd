import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transport-dialog.component.html',
  templateUrl: 'traveler-dialog.component.html',
  styleUrls: ['./traveler-dialog.component.css']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TravelerDialogComponent {
  constructor(public dialogRef: MatDialogRef<TravelerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
