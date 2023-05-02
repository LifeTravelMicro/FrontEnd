import {AfterViewInit, Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AgenciesService} from "../../../agencies/services/agencies.service";
import {AccommodationsService} from "../../../accommodations/services/accommodations.service";
import {TransportsService} from "../../../transports/services/transports.service";
import {ToursService} from "../../../tours/services/tours.service";

@Component({
  selector: 'app-transport-dialog.component.html',
  templateUrl: 'plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.css']
})
export class PlanDialogComponent implements OnInit {
  agency: any = {};
  transport: any = {};
  accommodation: any = {};
  tour: any = {};

  constructor(public dialogRef: MatDialogRef<PlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private agenciesService: AgenciesService,private transportService: TransportsService,private accommodationService: AccommodationsService,private tourService: ToursService) {
  }

  ngOnInit(): void {
    this.agenciesService.getAll().subscribe((response: any) => {
      this.agency = response.content.find((agency: any) => agency.id === this.data.agencyId)})

    this.transportService.getAll().subscribe((response: any) => {
      this.transport = response.content.find((transport: any) => transport.id === this.data.transportId)})

    this.accommodationService.getAll().subscribe((response: any) => {
      this.accommodation = response.content.find((accommodation: any) => accommodation.id === this.data.accommodationId)})

    this.tourService.getAll().subscribe((response: any) => {
      this.tour = response.content.find((tour: any) => tour.id === this.data.tourId)})

  }

}
