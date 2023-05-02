import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transport-dialog.component.html',
  templateUrl: 'review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ReviewDialogComponent {
  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
