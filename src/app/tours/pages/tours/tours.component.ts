import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Tour } from "../../model/tour";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ToursService } from '../../services/tours.service';
import * as _ from "lodash";
import {AgenciesService} from "../../../agencies/services/agencies.service";
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit, AfterViewInit {
  agencies: any =[];
  tourData: Tour;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'location', 'details', 'price',"meetingPoint",'agency','images', 'actions'];

  @ViewChild('tourForm', { static: false })
  tourForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;


  constructor(private toursService: ToursService , private agenciesService: AgenciesService) {
    this.tourData = {} as Tour;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllTours();
    this.agenciesService.getAll().subscribe((response: any) => {
      this.agencies = response.content;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllTours() {
    this.toursService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
    });
  }

  editItem(element: Tour) {
    this.tourData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.tourForm.resetForm();
  }

  deleteItem(id: number) {
    this.toursService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Tour) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addTour() {
    this.toursService.create(this.tourData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateTour() {
    this.toursService.update(this.tourData.id, this.tourData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Tour) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.tourForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateTour();
      } else {
        console.log('about to add');
        this.addTour();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
