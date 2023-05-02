import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";
import { Review } from "../model/review";
import BASE_URL from 'common/http';

@Injectable({
	providedIn: 'root'
})
export class ReviewsService {

	basePath = `${BASE_URL}/api/v1/reviews`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  }

  constructor(private http: HttpClient) {
  }

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

  create(item: any): Observable<Review> {
      const mappedItem = {
        comment: item.comment,
        rating: item.rating,
        plan: {
          id: item.planId
        },
        traveler: {
          id: item.travelerId
        },
        // pass a date field with the date in the format yyyy-MM-dd
        date: new Date().toISOString().split('T')[0]
      }

      console.log('envio esto',mappedItem)

      return this.http.post<Review>(this.basePath, JSON.stringify(mappedItem), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError));
    }

  // Create Review
  // create(item: any): Observable<Review> {
  //   return this.http.post<Review>(this.basePath, JSON.stringify(item), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError));
  // }

  // Get Review by id
  getById(id: any): Observable<Review> {
    return this.http.get<Review>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Reviews
  getAll(): Observable<Review> {
    return this.http.get<Review>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update Review
  update(id: any, item: any): Observable<Review> {
    return this.http.put<Review>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete Review
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}









