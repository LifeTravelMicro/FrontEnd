import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Plan } from "../../model/plan";
import { MatTableDataSource } from "@angular/material/table";
import { PlanesService } from "../../services/planes.service";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as _ from "lodash";
import * as moment from 'moment';
import { AgenciesService } from 'src/app/agencies/services/agencies.service';
import {TransportsService} from "../../../transports/services/transports.service";
import {ToursService} from "../../../tours/services/tours.service";
import {AccommodationsService} from "../../../accommodations/services/accommodations.service";

@Component({
	selector: 'app-planes',
	templateUrl: './planes.component.html',
	styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit, AfterViewInit {
	agencies: any = []
  accommodations: any = []
  transports: any = []
  tours: any = []

	planData: Plan;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'name', 'description',"duration", "capacity","extras",'actions'];

	@ViewChild('planForm', { static: false })
	planForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private planesService: PlanesService, private agenciesService: AgenciesService,private accommodationsService: AccommodationsService,private transportsService: TransportsService,private toursService: ToursService)
  {
		this.planData = {} as Plan;
		this.dataSource = new MatTableDataSource<any>();
	}


	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllPlanes();
		this.agenciesService.getAll().subscribe((response: any) => {
			this.agencies = response.content;
		})
    // para transports
    this.transportsService.getAll().subscribe((response: any) => {
      this.transports = response.content;
    })
    // para accommodations
    this.accommodationsService.getAll().subscribe((response: any) => {
      this.accommodations = response.content;
    })
    // para tours
    this.toursService.getAll().subscribe((response: any) => {
      this.tours = response.content;
    })

	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	parseDate(date: number) {
		return moment(date).format('LL')
	}

	getAllPlanes() {
		this.planesService.getAll().subscribe((response: any) => {
      const planes = response.content;

      const newPlanes = planes.map((plan: any) => {
        plan.date = this.parseDate(plan.date);
        return plan;
      })

      console.log('planes actuales',newPlanes)

      this.dataSource.data = newPlanes;
		});
	}

  doBusinessLogic() {
    // obtener el accommodation por el id y luego modificar el atributo available a false usando el metodo PUT
    this.accommodationsService.getById(this.planData.accommodationId).subscribe((response: any) => {
      const accommodation = response.content;
      accommodation.available = false;
      this.accommodationsService.update(accommodation.id, accommodation).subscribe((response: any) => {
        console.log(response);
      });
    })

    // obtener el transport por el id y luego modificar el atributo available a false usando el metodo PUT
    this.transportsService.getById(this.planData.transportId).subscribe((response: any) => {
      const transport = response.content;
      transport.available = false;
      this.transportsService.update(transport.id, transport).subscribe((response: any) => {
        console.log(response);
      });
    })

    // obtener el tour por el id y luego modificar el atributo available a false usando el metodo PUT
    this.toursService.getById(this.planData.tourId).subscribe((response: any) => {
      const tour = response.content;
      tour.available = false;
      this.toursService.update(tour.id, tour).subscribe((response: any) => {
        console.log(response);
      });
    })

  }

  checkIfElementsAreAvailable() {
    // @ts-ignore
    this.accommodationsService.getById(this.planData.accommodationId).subscribe((response: any) => {
      const accommodation = response.content;
      if (accommodation.available === false) {
        alert("El accommodation no esta disponible");
        return false;
      }
    })

    // @ts-ignore
    this.transportsService.getById(this.planData.transportId).subscribe((response: any) => {
      const transport = response.content;
      if (transport.available === false) {
        alert("El transport no esta disponible");
        return false;
      }
    })

    // @ts-ignore
    this.toursService.getById(this.planData.tourId).subscribe((response: any) => {
      const tour = response.content;
      if (tour.available === false) {
        alert("El tour no esta disponible");
        return false;
      }
    })

    return true;
  }

	editItem(element: Plan) {
		this.planData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.planForm.resetForm();
	}

	deleteItem(id: number) {
		this.planesService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: Plan) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}
	addPlan() {
		this.planesService.create(this.planData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.doBusinessLogic();
    });
	}
	updatePlan() {
		this.planesService.update(this.planData.id, this.planData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: Plan) => {
				if (o.id === response.id) {
					o = response;
				}
				return o;
			});
		});
	}
	onSubmit() {
		if (this.planForm.form.valid && this.checkIfElementsAreAvailable()) {
			console.log('valid');
			if (this.isEditMode) {
				console.log('about to update');
				this.updatePlan();
			} else {
				console.log('about to add');
				this.addPlan();
			}
			this.cancelEdit();
		} else {
			console.log('Invalid data');
      alert("Datos invalidos");
		}
	}

}
