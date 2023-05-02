import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Plan } from "../model/plan";
import { AccommodationsService } from "../../accommodations/services/accommodations.service";
import BASE_URL from 'common/http';


@Injectable({
	providedIn: 'root'
})
export class PlanesService {

	basePath = `${BASE_URL}/api/v1/plans`;
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		})
	}
	constructor(private http: HttpClient) {




	}
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
	create(item: any): Observable<Plan> {

		const mappedItem = {
			name: item.name,
			description: item.description,
			duration: item.duration,
			capacity: item.capacity,
			available: "true",
			thumbnail: item.thumbnail,
			agency: {
				id: item.agencyId
			},
			accommodation: {
				id: item.accommodationId
			},
			transport: {
				id: item.transportId
			},
			tour: {
				id: item.tourId
			}
		}

		return this.http.post<Plan>(this.basePath, JSON.stringify(mappedItem), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	getById(id: any): Observable<Plan> {
		return this.http.get<Plan>(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	getAll(): Observable<Plan> {
		return this.http.get<Plan>(this.basePath, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	update(id: any, item: any): Observable<Plan> {
		return this.http.put<Plan>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
	delete(id: any) {
		console.log(id)
		return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError));
	}
}
