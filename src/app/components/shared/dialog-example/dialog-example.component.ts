import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-transport-dialog.component.html',
  templateUrl: 'dialog-example.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class DialogExampleComponent {
  constructor(public dialogRef: MatDialogRef<DialogExampleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
