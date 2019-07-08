import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Our Store App';
  // uri = 'http://localhost:4000/items/add';
  uri = 'http://storeappbackend.herokuapp.com/items/add';
  // geturi = 'http://localhost:4000/items/find'
  geturi = 'https://storeappbackend.herokuapp.com/items/find'

  edituri = 'http://localhost:4000/items/edit';
  // uri = 'http://storeappbackend.herokuapp.com/items/edit';

  deluri = 'http://localhost:4000/items/edit';
  // uri = 'http://storeappbackend.herokuapp.com/items/edit';


  item = {
    Description: '',
    Cost: ''
  };
  searchText;
  public itemlist;

  constructor(private router: Router, private http: HttpClient) {  }
  ngOnInit() {
    this.getItem();
  }
  addItem = () => {
    this.http.post(`${this.uri}`, this.item).subscribe(data => {
      this.itemlist.push(this.item);
      this.item = {
        Description: '',
        Cost: ''
      };
      console.log('After Backend call', +data);
    });
  }
  getItem = () => {
    this.http.get(`${this.geturi}`).subscribe(res => {
      console.log(res);
      this.itemlist = res;
      return this.itemlist;
    });

    // editItem = () => {
    //   this.http.post(`${this.edituri}`, this.item).subscribe(data => {
    //     this.itemlist.push(this.item);
    //     this.item = {
    //       Description: '',
    //       Cost: ''
    //     };
    //     console.log('After Backend call', +data);
    //   });
  }
}
