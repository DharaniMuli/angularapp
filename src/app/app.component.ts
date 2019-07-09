import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {NgModel} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Our Store App';

  // Local urls
  // adduri = 'http://localhost:4000/items/add';
  // geturi = 'http://localhost:4000/items/find';
  // edituri = 'http://localhost:4000/items/edit';
  // deluri = 'http://localhost:4000/items/delete';

  // Global urls

  adduri = 'https://storeappbackend.herokuapp.com/items/add';
  geturi = 'https://storeappbackend.herokuapp.com/items/find'
  edituri = 'https://storeappbackend.herokuapp.com/items/edit';
  deluri = 'https://storeappbackend.herokuapp.com/items/delete';


  item = {
    Description: '',
    Cost: ''
  };

  itemid = {
    id :''
  }
  searchText;
  public itemlist;

  constructor(private router: Router, private http: HttpClient) {  }
  ngOnInit() {
    this.getItem();
  }
  addItem = () => {
    if(this.item.Description == this.itemlist.Description){
      console.log("Item already exists")
    }
    this.http.post(`${this.adduri}`, this.item).subscribe(data => {

      this.getItem()
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

  }
  editItem = (id) => {
    this.http.post(`${this.edituri}`, this.item).subscribe(data => {
      this.itemlist.push(this.item);
      this.item = {
        Description: '',
        Cost: ''
      };
      console.log('After Backend call', +data);
    });
  }

  deleteItem = (itemid, i) => {
    console.log(itemid);
    this.itemid ={
      id : itemid
    }

    const index: number = this.itemlist.indexOf(itemid);
    console.log(index)
    if (index !== -1) {
      this.itemlist.splice(index, 1);
    }
    this.http.post(`${this.deluri}`, this.itemid).subscribe(data =>{

      this.itemlist.splice(i, 1);
      console.log(data);
    })
  }
}
