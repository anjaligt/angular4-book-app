import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
	bookList: {};
	books: {};
	purchasedbook:any= [];
	
	constructor( private http: Http, private session:LocalStorageService ) {
  	}
  
  ngOnInit() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const options = new RequestOptions({headers: headers});
  	this.http.get("http://localhost/my-book-app/server/index.php/api/users/getBooks",options).subscribe(result => {
  		this.bookList = JSON.parse(result["_body"]);
  		this.books = this.bookList["Data"];
  		this.session.store('session_data', this.books);//storing data in local storage service
  	});
  }

   storeBook(book) {
   	book.showbutton = 0;
   	this.purchasedbook.push(book);
   	this.session.store('purchasedData', this.purchasedbook);
   }
  
}
