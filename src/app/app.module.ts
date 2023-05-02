import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';

// Components
import { PaymentComponent } from './payments/pages/payment/payment.component';
import { TravelersComponent } from './travelers/pages/travelers/travelers.component';
import { AgenciesComponent } from './agencies/pages/agencies/agencies.component';
import { PlanesComponent } from './planes/pages/planes/planes.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import {AgencyDialogComponent} from "./agencies/components/agency-dialog/agency-dialog.component";
import {TravelerDialogComponent} from "./travelers/components/traveler-dialog/traveler-dialog.component";
import { TransportsComponent } from './transports/pages/transports/transports.component';
import {AccommodationsComponent} from "./accommodations/pages/accommodations/accommodations.component";
import {ToursComponent} from "./tours/pages/tours/tours.component";
import {ReviewsComponent} from "./reviews/pages/reviews/reviews.component";
import {TransportDialogComponent} from "./transports/components/transport-dialog/transport-dialog.component";
import {PlanDialogComponent} from "./planes/components/plan-dialog/plan-dialog.component";
import {ConfirmDialogComponent} from "./components/shared/confirm-dialog/confirm-dialog.component";
import {ReviewDialogComponent} from "./reviews/components/review-dialog/review-dialog.component";
import { AccommodationDialogComponent } from './accommodations/components/accommodation-dialog/accommodation-dialog/accommodation-dialog.component';
import { TourDialogComponent } from './tours/components/tour-dialog/tour-dialog/tour-dialog.component';
import { TransportImagesComponent } from './transports/pages/transport-images/transport-images.component';
import {AccommodationImagesComponent} from "./accommodations/pages/accommodation-images/accommodation-images.component";
import {TourImagesComponent} from "./tours/pages/tour-images/tour-images.component";


@NgModule({
	declarations: [
		AppComponent,
		TravelersComponent,
		PaymentComponent,
		PlanesComponent,
		AgenciesComponent,
    TransportsComponent,
    AccommodationsComponent,
    ToursComponent,
    ReviewsComponent,
		TransportImagesComponent,
    AccommodationImagesComponent,
    TourImagesComponent,
    // Dialogs
    ConfirmDialogComponent,
    AgencyDialogComponent,
    TravelerDialogComponent,
    TransportDialogComponent,
    PlanDialogComponent,
    ReviewDialogComponent,
    AccommodationDialogComponent,
    TourDialogComponent
	],
	imports: [
    BrowserModule,
    AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		MatNativeDateModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatToolbarModule,
		MatIconModule,
		MatSortModule,
		MatSidenavModule,
		MatListModule,
		MatDatepickerModule,
		MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatCardModule,
    MatDividerModule,
    MatSliderModule,
    MatRadioModule
	],
  entryComponents: [ConfirmDialogComponent,AgencyDialogComponent,TravelerDialogComponent,TransportDialogComponent,PlanDialogComponent,ReviewDialogComponent, AccommodationDialogComponent,TourDialogComponent],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
