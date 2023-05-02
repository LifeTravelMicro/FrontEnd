import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Accommodation } from "../model/accomodation";
import BASE_URL from 'common/http';

@Injectable({
	providedIn: 'root'
})
export class AccommodationsService {

	// Accommodations Endpoint
	basePath = `${BASE_URL}/api/v1/accommodations`;

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

	// Create Accommodation
	create(item: any): Observable<Accommodation> {



		const mappedItem = {
			...item,
			agency: {
				id: item.agencyId
			}
		}
		return this.http.post<Accommodation>(this.basePath, JSON.stringify(mappedItem), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get Accommodation by id
	getById(id: any): Observable<Accommodation> {
		return this.http.get<Accommodation>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get All Accommodations
	getAll(): Observable<Accommodation> {
		return this.http.get<Accommodation>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Update Accommodation
	update(id: any, item: any): Observable<Accommodation> {
		return this.http.put<Accommodation>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Delete Accommodation
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
