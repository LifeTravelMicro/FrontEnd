import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { TransportImage } from "../../model/transportImage";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as _ from "lodash";
import { TransportImagesService } from '../../services/transport-images.service';
import { TransportsService } from '../../services/transports.service';
@Component({
	selector: 'app-transports-images',
	templateUrl: './transport-images.component.html',
	styleUrls: ['./transport-images.component.css']
})
export class TransportImagesComponent implements OnInit, AfterViewInit {
	transports: any;
	transportImagesData: TransportImage;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['id', 'travelerId', 'image', "actions"];

	@ViewChild('transportImagesForm', { static: false })
	transportImagesForm!: NgForm;

	@ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;

	@ViewChild(MatSort)
	sort!: MatSort;

	isEditMode = false;

	constructor(private transportImageService: TransportImagesService, private transportService: TransportsService) {
		this.transportImagesData = {} as TransportImage;
		this.dataSource = new MatTableDataSource<any>();
	}

	ngOnInit(): void {
		this.dataSource.paginator = this.paginator;
		this.getAllTransportsImages();
		this.transportService.getAll().subscribe((response: any) => {
			this.transports = response.content;
		})
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	}

	getAllTransportsImages() {
		this.transportImageService.getAll().subscribe((response: any) => {
			this.dataSource.data = response.content;
		});
	}

	editItem(element: TransportImage) {
		this.transportImagesData = _.cloneDeep(element);
		this.isEditMode = true;
	}

	cancelEdit() {
		this.isEditMode = false;
		this.transportImagesForm.resetForm();
	}

	deleteItem(id: number) {
		this.transportImageService.delete(id).subscribe(() => {
			this.dataSource.data = this.dataSource.data.filter((o: TransportImage) => {
				return o.id !== id ? o : false;
			});
		});
		console.log(this.dataSource.data);
	}

	addTransportImage() {

		this.transportImageService.create(this.transportImagesData).subscribe((response: any) => {
			this.dataSource.data.push({ ...response });
			this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
		});
	}

	updateTransportImage() {
		this.transportImageService.update(this.transportImagesData.id, this.transportImagesData).subscribe((response: any) => {
			this.dataSource.data = this.dataSource.data.map((o: TransportImage) => {
				if (o.id === response.id) {
					o = response;
				}
				return o;
			});
		});
	}

	onSubmit() {
		if (this.transportImagesForm.form.valid) {
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
