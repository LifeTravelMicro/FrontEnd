import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as _ from "lodash";
import { AccommodationImage } from '../../model/accommodationImage';
import { AccommodationImagesService } from '../../services/accommodation-images.service';
import { AccommodationsService } from '../../services/accommodations.service';
@Component({
	selector: 'app-accommodations-images',
	templateUrl: './accommodation-images.component.html',
	styleUrls: ['./accommodation-images.component.css']
})
export class AccommodationImagesComponent implements OnInit, AfterViewInit {
	accommodations: any;
	accommodationImagesData: AccommodationImage;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'accommodationId', 'image', "actions"];

	@ViewChild('accommodationImagesForm', { static: false })
	accommodationImagesForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private accommodationImageService: AccommodationImagesService, private accommodationService: AccommodationsService) {
		this.accommodationImagesData = {} as AccommodationImage;
		this.dataSource = new MatTableDataSource<any>();
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllAccommodationsImages();
		this.accommodationService.getAll().subscribe((response: any) => {
			this.accommodations = response.content;
		})
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllAccommodationsImages() {
		this.accommodationImageService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: AccommodationImage) {
		this.accommodationImagesData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.accommodationImagesForm.resetForm();
	}

	deleteItem(id: number) {
		this.accommodationImageService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: AccommodationImage) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}

	addTransportImage() {

		this.accommodationImageService.create(this.accommodationImagesData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
		});
	}

	updateTransportImage() {
		this.accommodationImageService.update(this.accommodationImagesData.id, this.accommodationImagesData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: AccommodationImage) => {
				if (o.id === response.id) {
					o = response;
				}
				return o;
			});
		});
	}

	onSubmit() {
		if (this.accommodationImagesForm.form.valid) {
			console.log('valid');
			if (this.isEditMode) {
				console.log('about to update');
				this.updateTransportImage();
			} else {
				console.log('about to add');
				this.addTransportImage();
			}
			this.cancelEdit();
		} else {
			console.log('Invalid data');
		}
	}
}
