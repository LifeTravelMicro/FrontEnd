import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Tour } from "../model/tour";
import BASE_URL from "../../../../common/http";

@Injectable({
	providedIn: 'root'
})
export class ToursService {

	// Tours Endpoint
	basePath = `${BASE_URL}/api/v1/tours`;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		})
	}
	constructor(private http: HttpClient) { }

	// API Error Handling
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

	// Create Tour
	create(item: any): Observable<Tour> {

		const tour = {
			details: item.details,
			location: item.location,
			agency: {
				id: item.agencyId
			},
			meetingPoint: item.meetingPoint,
			price: item.price,
			available: "true",
		}

		console.log(tour)

		return this.http.post<Tour>(this.basePath, JSON.stringify(tour), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get Tour by id
	getById(id: any): Observable<Tour> {
		return this.http.get<Tour>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get All Tours
	getAll(): Observable<Tour> {
		return this.http.get<Tour>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Update Tour
	update(id: any, item: any): Observable<Tour> {
		return this.http.put<Tour>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Delete Tour
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
