import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Traveler } from "../../model/traveler";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TravelersService } from '../../services/travelers.service';
import * as _ from "lodash";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
	selector: 'app-travelers',
	templateUrl: './travelers.component.html',
	styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit, AfterViewInit {

	travelerData: Traveler;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'name', 'email', 'phone','reviews', 'actions'];

	@ViewChild('travelerForm', { static: false })
	travelerForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private travelersService: TravelersService) {
		this.travelerData = {} as Traveler;
		this.dataSource = new MatTableDataSource<any>();
	}

  ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllTravelers();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllTravelers() {
		this.travelersService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: Traveler) {
		this.travelerData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.travelerForm.resetForm();
	}

	deleteItem(id: number) {
		this.travelersService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: Traveler) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}

	addTraveler() {
		this.travelersService.create(this.travelerData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.travelerForm.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Traveler added successfully',
        showConfirmButton: false,
        timer: 1500
      })
		});
	}

	updateTraveler() {
		this.travelersService.update(this.travelerData.id, this.travelerData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: Traveler) => {
				if (o.id === response.id) o = response;
				return o;
			});
      Swal.fire({
        icon: 'success',
        title: 'Traveler updated successfully',
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

  validatePhone(phone: string) {
    const re = /^[0-9]{9}$/;
    return re.test(phone);
  }

	onSubmit() {

    const email = this.travelerData.email;

    if(!this.travelerForm.form.valid){
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
    else if(!this.validatePhone(this.travelerData.phone)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid phone number!',
      })
    }
		else if (this.travelerForm.form.valid) {
			console.log('valid');
			if (this.isEditMode) {
				console.log('about to update');
				this.updateTraveler();
			} else {
				console.log('about to add');
				this.addTraveler()
			}
			this.cancelEdit();
		}
	}
}
