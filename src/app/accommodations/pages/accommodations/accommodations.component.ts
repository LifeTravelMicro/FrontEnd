import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Accommodation } from "../../model/accomodation";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AccommodationsService } from '../../services/accommodations.service';
import * as _ from "lodash";
import {AgenciesService} from "../../../agencies/services/agencies.service";
@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit, AfterViewInit {
  agencies: any =[];
  accommodationData: Accommodation;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'location', 'details', 'price','agency','images', 'actions'];

  @ViewChild('accommodationForm', { static: false })
  accommodationForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private accommodationsService: AccommodationsService, private agenciesService: AgenciesService) {
    this.accommodationData = {} as Accommodation;
    this.dataSource = new MatTableDataSource<any>();
    this.agenciesService.getAll().subscribe((response: any) => {
      this.agencies = response.content;
    })
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllAccommodations();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllAccommodations() {
    this.accommodationsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
    });
  }

  editItem(element: Accommodation) {
    this.accommodationData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.accommodationForm.resetForm();
  }

  deleteItem(id: number) {
    this.accommodationsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Accommodation) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addAccommodation() {
    this.accommodationsService.create(this.accommodationData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateAccommodation() {
    this.accommodationsService.update(this.accommodationData.id, this.accommodationData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Accommodation) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.accommodationForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateAccommodation();
      } else {
        console.log('about to add');
        this.addAccommodation();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
