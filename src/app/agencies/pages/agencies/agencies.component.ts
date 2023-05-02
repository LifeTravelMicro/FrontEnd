import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Agency } from "../../model/agency";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AgenciesService } from '../../services/agencies.service';
import {AgencyDialogComponent} from "../../components/agency-dialog/agency-dialog.component";
import * as _ from "lodash";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
	selector: 'app-agencies',
	templateUrl: './agencies.component.html',
	styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit, AfterViewInit {

	agencyData: Agency;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'name', 'ruc', 'email','extra', 'actions'];

	@ViewChild('agenciesForm', { static: false })
	agenciesForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

  agencyDialogComponent = AgencyDialogComponent

	constructor(private agenciesService: AgenciesService) {
		this.agencyData = {} as Agency;
		this.dataSource = new MatTableDataSource<any>();
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllAgencies();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllAgencies() {
		this.agenciesService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: Agency) {
		this.agencyData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.agenciesForm.resetForm();
	}

	deleteItem(id: number) {
		this.agenciesService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: Agency) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}

	addAgency() {
		this.agenciesService.create(this.agencyData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.agenciesForm.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Agency added successfully',
        showConfirmButton: false,
        timer: 1500
      })
		});
	}

	updateAgency() {
		this.agenciesService.update(this.agencyData.id, this.agencyData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: Agency) => {
				if (o.id === response.id) 	o = response
				return o;
			});
      Swal.fire({
        icon: 'success',
        title: 'Agency updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
		});
	}

  // Validations

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  validateRuc(ruc: string) {
    const re = /^[0-9]{11}$/;
    return re.test(ruc);
  }

  onSubmit() {

    const email = this.agencyData.email;
    const ruc = this.agencyData.ruc;

    if(!this.agenciesForm.form.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      })
      return;
    }
    else if(!this.validateEmail(email)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email!',
      })
    }
    else if(!this.validateRuc(ruc.toString())){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid RUC!',
      })
    }
    else if (this.agenciesForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateAgency();
      } else {
        console.log('about to add');
        this.addAgency()
      }
      this.cancelEdit();
    }
  }
}
