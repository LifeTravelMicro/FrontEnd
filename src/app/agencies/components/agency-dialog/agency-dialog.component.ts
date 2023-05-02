import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transport-dialog.component.html',
  templateUrl: 'agency-dialog.component.html',
  styleUrls: ['./agency-dialog.component.css']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AgencyDialogComponent {
  constructor(public dialogRef: MatDialogRef<AgencyDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
