import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { NgForm } from "@angular/forms";
import { Review } from "../../model/review";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ReviewsService } from '../../services/reviews.service';
import * as _ from "lodash";
import {TravelersService} from "../../../travelers/services/travelers.service";
import {PlanesService} from "../../../planes/services/planes.service";
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, AfterViewInit {

  travelers:any=[]
  planes: any =[]

  reviewData: Review;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id',"comment","rating","date","travelerId","planId" ,"actions"];

  @ViewChild('reviewForm', { static: false })
  reviewForm!: NgForm;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  isEditMode = false;

  constructor(private reviewsService: ReviewsService, private planesService: PlanesService, private travelersService: TravelersService) {
    this.reviewData = {} as Review;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllReviews();
    // traer los planes
    this.planesService.getAll().subscribe((response: any) => {
      this.planes = response.content;
    })
    // traer los travelers
    this.travelersService.getAll().subscribe((response: any) => {
      this.travelers = response.content;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllReviews() {
    this.reviewsService.getAll().subscribe((response: any) => {

      // const reviews: any = response.content.map((review: any) => {

        // const reviewMapped = {
        //   ...review
        // }

        // console.log('review', review);

        // this.planesService.getById(review.planId).subscribe((response: any) => {
        //   reviewMapped.planId = response;
        // })
        // this.travelersService.getById(review.travelerId).subscribe((response: any) => {
        //   reviewMapped.travelerId = response;
        // })

        // return reviewMapped;

      // })

      // console.log("reviews",reviews);

      this.dataSource.data = response.content;

    });
  }

  editItem(element: Review) {
    this.reviewData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.reviewForm.resetForm();
  }

  deleteItem(id: number) {
    this.reviewsService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: Review) => {
        return o.id !== id ? o : false;
      });
    });
    console.log(this.dataSource.data);
  }

  addReview() {
    this.reviewsService.create(this.reviewData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  updateReview() {
    this.reviewsService.update(this.reviewData.id, this.reviewData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Review) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  onSubmit() {
    if (this.reviewForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateReview();
      } else {
        console.log('about to add');
        this.addReview();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
