import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as _ from "lodash";
import {TourImage} from "../../model/tourImage";
import {ToursService} from "../../services/tours.service";
import {TourImagesService} from "../../services/tour-images.service";

@Component({
	selector: 'app-tours-images',
	templateUrl: './tour-images.component.html',
	styleUrls: ['./tour-images.component.css']
})
export class TourImagesComponent implements OnInit, AfterViewInit {
	tours: any;
	tourImagesData: TourImage;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'tourId', 'image', "actions"];

	@ViewChild('tourImagesForm', { static: false })
	tourImagesForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private transportImageService: TourImagesService, private tourService: ToursService) {
		this.tourImagesData = {} as TourImage;
		this.dataSource = new MatTableDataSource<any>();
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllToursImages();
		this.tourService.getAll().subscribe((response: any) => {
			this.tours = response.content;
		})
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllToursImages() {
		this.transportImageService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: TourImage) {
		this.tourImagesData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.tourImagesForm.resetForm();
	}

	deleteItem(id: number) {
		this.transportImageService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: TourImage) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}

	addTourImage() {

		this.transportImageService.create(this.tourImagesData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
		});
	}

	updateTourImage() {
		this.transportImageService.update(this.tourImagesData.id, this.tourImagesData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: TourImage) => {
				if (o.id === response.id) {
					o = response;
				}
				return o;
			});
		});
	}

	onSubmit() {
		if (this.tourImagesForm.form.valid) {
			console.log('valid');
			if (this.isEditMode) {
				console.log('about to update');
				this.updateTourImage();
			} else {
				console.log('about to add');
				this.addTourImage();
			}
			this.cancelEdit();
		} else {
			console.log('Invalid data');
		}
	}
}
