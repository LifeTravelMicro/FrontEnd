import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { TransportImage } from "../model/transportImage";
import * as moment from "moment";
import BASE_URL from 'common/http';

@Injectable({
	providedIn: 'root'
})
export class TransportImagesService {


	basePath = `${BASE_URL}/api/v1/transport_images`;

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

	// Create TransportImage
	create(item: any): Observable<TransportImage> {

		const image = {
			path: item.path,
			transport: {
				id: item.transportId
			},
		}

		return this.http.post<TransportImage>(this.basePath, JSON.stringify(image), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get TransportImage by id
	getById(id: any): Observable<TransportImage> {
		return this.http.get<TransportImage>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Get All Transports
	getAll(): Observable<TransportImage> {
		return this.http.get<TransportImage>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Update TransportImage
	update(id: any, item: any): Observable<TransportImage> {

    const image = {
      path: item.path,
      transport: {
        id: item.transportId
      }
    }

		return this.http.put<TransportImage>(`${this.basePath}/${id}`, JSON.stringify(image), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}

	// Delete TransportImage
	delete(id: any) {
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
