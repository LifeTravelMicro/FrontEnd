import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { TourImage } from "../model/tourImage";
import * as moment from "moment";
import BASE_URL from 'common/http';

@Injectable({
	providedIn: 'root'
})
export class TourImagesService {

	basePath = `${BASE_URL}/api/v1/tour_images`;

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

	// Create TourImage
	create(item: any): Observable<TourImage> {

		const image = {
			path: item.path,
			tour: {
				id: item.tourId
			},
		}

		return this.http.post<TourImage>(this.basePath, JSON.stringify(image), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get TourImage by id
	getById(id: any): Observable<TourImage> {
		return this.http.get<TourImage>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get All Transports
	getAll(): Observable<TourImage> {
		return this.http.get<TourImage>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Update TourImage
	update(id: any, item: any): Observable<TourImage> {
		return this.http.put<TourImage>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Delete TourImage
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
