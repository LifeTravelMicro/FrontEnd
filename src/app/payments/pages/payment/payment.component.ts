import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as _ from "lodash";
import { Payment } from "../../model/payment";
import { PaymentsService } from "../../services/payments.service";
import { PlanesService } from 'src/app/planes/services/planes.service';
import {TravelersService} from "../../../travelers/services/travelers.service";
import {TransportsService} from "../../../transports/services/transports.service";
import {ToursService} from "../../../tours/services/tours.service";
import {AccommodationsService} from "../../../accommodations/services/accommodations.service";

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {
	planes: any = [];
  travelers : any =[];
	paymentData: Payment;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'planId', 'travelerId', 'price', 'actions'];
	@ViewChild('paymentForm', { static: false })
	paymentForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private paymentsService: PaymentsService, private planesService: PlanesService , private  travelersService : TravelersService,private transportsService: TransportsService, private accommodationsService: AccommodationsService, private toursService: ToursService) {
		this.paymentData = {} as Payment;
		this.dataSource = new MatTableDataSource<any>();
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllPayments();
		this.planesService.getAll().subscribe((response: any) => {
			this.planes = response.content;
		})
    this.travelersService.getAll().subscribe((response: any) => {
      this.travelers = response.content;
    })
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllPayments() {
		this.paymentsService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: Payment) {
		this.paymentData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.paymentForm.resetForm();
	}

	deleteItem(id: number) {
		this.paymentsService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: Payment) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}
  addPayment() {
    // this.paymentData.price = 0;
    //
    // await this.planesService.getById(this.paymentData.planId).subscribe(async (response: any) => {
    //
    //   let amounts:any  = {
    //     transport: 0,
    //     accommodation: 0,
    //     tour: 0
    //   }
    //   await this.transportsService.getById(response.transportId).subscribe((transport: any) => {
    //     amounts.transport = transport.price;
    //   });
    //   await this.accommodationsService.getById(response.accommodationId).subscribe((accommodation: any) => {
    //     amounts.accommodation = accommodation.price;
    //   });
    //   await this.toursService.getById(response.tourId).subscribe((tour: any) => {
    //     amounts.tour = tour.price;
    //   });
    //
    //   console.log(amounts)
    //
    // })

		this.paymentsService.create(this.paymentData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
		});
	}
	updatePayment() {
		this.paymentsService.update(this.paymentData.id, this.paymentData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: Payment) => {
				if (o.id === response.id) {
					o = response;
				}
				return o;
			});
		});
	}
	onSubmit() {
		if (this.paymentForm.form.valid) {
			console.log('valid');
			if (this.isEditMode) {
				console.log('about to update');
				this.updatePayment();
			} else {
				console.log('about to add');
				this.addPayment();
			}
			this.cancelEdit();
		} else {
			console.log('Invalid data');
		}
	}



}
