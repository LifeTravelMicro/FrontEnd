import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Transport } from "../../model/transport";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TransportsService } from '../../services/transports.service';
import * as _ from "lodash";
import * as moment from 'moment';
import {AgenciesService} from "../../../agencies/services/agencies.service";
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit, AfterViewInit {

  agencies: any = [];
  transportData: Transport;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'type', 'seats', 'departureDate','returnDate', 'price',"agencyId", "images","actions"];

   transportOptions: any[] = [
    'Bus',
    'Train',
    'Plane'
  ]

  @ViewChild('transportForm', { static: false })
  transportForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private transportsService: TransportsService, private agenciesService: AgenciesService) {
    this.transportData = {} as Transport;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllTransports();
    this.agenciesService.getAll().subscribe((response: any) => {
      this.agencies = response.content;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllTransports() {
    this.transportsService.getAll().subscribe((response: any) => {
      console.table(response.content)
      this.dataSource.data = response.content;
    });
  }

  editItem(element: Transport) {
    this.transportData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.transportForm.resetForm();
  }

  deleteItem(id: number) {
    this.transportsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Transport) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addTransport() {

    this.transportsService.create(this.transportData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.transportForm.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Agency added successfully',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  updateTransport() {
    this.transportsService.update(this.transportData.id, this.transportData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Transport) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
      Swal.fire({
        icon: 'success',
        title: 'Transport updated successfully',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  validateSeats(seats: string){
     // validar que sea un numero
      if(Number(seats) < 0)
        return false;
      return true;
  }

  validatePrice(price: number | string){
     // validar que sea un numero
      if(Number(price) < 0)
        return false;
      return true;
  }

  onSubmit() {

    const price = this.transportData.price;
    const seats = this.transportData.seats;

    if(!this.transportForm.form.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the fields!',
      })
      return;
    }
    else if(!this.validateSeats(seats)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid seats! Please enter a valid number and must be greater than 0',
      })
    }
    else if(!this.validatePrice(price)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid price! Please enter a valid number and must be greater than 0',
      })
    }
    else if (this.transportForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateTransport();
      } else {
        console.log('about to add');
        this.addTransport()
      }
      this.cancelEdit();
    }
  }
}
