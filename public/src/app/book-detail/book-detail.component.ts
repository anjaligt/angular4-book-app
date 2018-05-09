import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  constructor( private http: Http, private session:LocalStorageService) { }
	public book_Id:any= [];
	bookDetail: {};
	books: {};
  ngOnInit() {
  	this.books = this.session.retrieve('purchasedData');
  }

}
