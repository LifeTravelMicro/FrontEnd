import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-transport-dialog.component.html',
	templateUrl: 'transport-dialog.component.html',
	styleUrls: ['./transport-dialog.component.css']
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class TransportDialogComponent {
	constructor(public dialogRef: MatDialogRef<TransportDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
}
