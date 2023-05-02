import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { AccommodationImage } from "../model/accommodationImage";
import BASE_URL from 'common/http';

@Injectable({
	providedIn: 'root'
})
export class AccommodationImagesService {


	basePath = `${BASE_URL}/api/v1/accommodation_images`;

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

	// Create AccommodationImage
	create(item: any): Observable<AccommodationImage> {

		const image = {
			path: item.path,
			accommodation: {
				id: item.accommodationId
			},
		}

		return this.http.post<AccommodationImage>(this.basePath, JSON.stringify(image), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get AccommodationImage by id
	getById(id: any): Observable<AccommodationImage> {
		return this.http.get<AccommodationImage>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get All Transports
	getAll(): Observable<AccommodationImage> {
		return this.http.get<AccommodationImage>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Update AccommodationImage
	update(id: any, item: any): Observable<AccommodationImage> {
		return this.http.put<AccommodationImage>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Delete AccommodationImage
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
