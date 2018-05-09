import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageService } from 'ngx-webstorage'; 

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
	bookList: {};
	books: {};
	purchasedbook[]: [];
	
	constructor( private http: Http, private session:LocalStorageService ) {
  	}
  
  ngOnInit() {
  	var data: {};
  	var config = { headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}};
  	this.http.get("http://localhost/my-book-app/server/index.php/api/users/getBooks",data,config).subscribe(result => {
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
