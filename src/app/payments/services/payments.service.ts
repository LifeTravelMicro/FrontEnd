import { Injectable } from '@angular/core';
import { Payment } from "../model/payment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import BASE_URL from 'common/http';


@Injectable({
	providedIn: 'root'
})
export class PaymentsService {

	basePath = `${BASE_URL}/api/v1/payments`;
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	}
	constructor(private http: HttpClient) { }
	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// Default error handling
			console.log(`An error occurred: ${error.error.message} `);
		} else {
			// Unsuccessful Response Error Code returned from Backend
			console.error(
				`Backend returned code ${error.status}, body was: ${error.error}`
			);
		}
		// Return Observable with Error Message to Client
		return throwError(() => new Error('Something happened with request, please try again later'));
	}
	create(item: any): Observable<Payment> {

    const payment = {
      plan: {
        id: item.planId
      },
      traveler: {
        id: item.travelerId
      },
      price: item.price
    }

    console.log(payment);

		return this.http.post<Payment>(this.basePath, JSON.stringify(payment), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	getById(id: any): Observable<Payment> {
		return this.http.get<Payment>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	getAll(): Observable<Payment> {
		return this.http.get<Payment>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	update(id: any, item: any): Observable<Payment> {
		return this.http.put<Payment>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
