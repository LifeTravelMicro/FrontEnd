import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciesComponent } from './agencies/pages/agencies/agencies.component';
import { PaymentComponent } from './payments/pages/payment/payment.component';
import { PlanesComponent } from './planes/pages/planes/planes.component';
import { TravelersComponent } from './travelers/pages/travelers/travelers.component';
import {TransportsComponent} from "./transports/pages/transports/transports.component";
import {AccommodationsComponent} from "./accommodations/pages/accommodations/accommodations.component";
import {ToursComponent} from "./tours/pages/tours/tours.component";
import {ReviewsComponent} from "./reviews/pages/reviews/reviews.component";

export const routes: Routes = [
	{ path: 'travelers', component: TravelersComponent },
  { path: 'agencies', component: AgenciesComponent },
  {path: 'transports', component: TransportsComponent},
  {path: 'accommodations', component: AccommodationsComponent},
  {path: "tours", component: ToursComponent},
  { path: 'planes', component: PlanesComponent },
  {path: "reviews", component: ReviewsComponent},
	{ path: 'payments', component: PaymentComponent },
  { path: '**', redirectTo: 'travelers'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
