## Ng2PagingTableModule

> This angular module is to empover table pagination.

For now, one component is added in this library
```html
  <ng2-paging-table (onRowClick)="onRowClick($event)" [config]="config" [dataSource]="dataSource"></ng2-paging-table>
```

# How to use?

* Include our ```ng2-paging-table``` module in ```app.module.ts```
```javascript
import { Ng2PagingTableModule } from 'ng2-paging-table';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2PagingTableModule //<-- add the module in imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
* Declare settings and datasource  in ```app.component.ts```
```javascript
//app.component.ts
export class AppComponent {
  config:any={
    enableCheck:true,// it enable check box selection for each row
    showLoading: true,
    paging: {perPage:[10,50,100,500]},
    columns:[
      { "field": "index", "title": "Sr.N", "filter": true, "type": "number" },
      {"field":"id","title":"ID","filter":true,"type":"string"},
      {"field":"name","title":"Name","filter":true,"type":"string"},
      {"field":"country","title":"Country","filter":true,"type":"string"},
      {"field":"city","title":"City","filter":true,"type":"string"},
      {"field":"date","title":"Date","filter":true,"type":"date",'dateFormat':'medium'}
     ]
  };
  dataSource:any[]=[
     {"id":1,"name":"Yahya Mayo","country":"PK","city":"Lahore","date":"2020-04-18"}
    ,{"id":2,"name":"Hafiz Imran","country":"India","city":"Dehli","date":"2020-04-18"}
    ,{"id":3,"name":"Muhammad Afzal","country":"United Kingdom","city":"London","date":"2020-04-18"}
    ,{"id":4,"name":"Muhammad Akram","country":"United States","city":"New York","date":"2020-04-18"}
    ,{"id":5,"name":"Sikandar Hayat","country":"Italy","city":"Milan","date":"2020-04-18"}
    ,{"id":6,"name":"Malik Asif","country":"Jordan","city":"Berot","date":"2020-04-18"}
    ,{"id":7,"name":"Danish Ilyas","country":"Turkey","city":"Istanbul","date":"2020-04-18"}
    ,{"id":8,"name":"Sajid Masood","country":"Germany","city":"Berlin","date":"2020-04-18"}
    ,{"id":9,"name":"Ghazanfar Puno","country":"France","city":"Paris","date":"2020-04-18"}
    ,{"id":10,"name":"Altaf Totta","country":"Bangladesh","city":"Dhakka","date":"2020-04-18"}
    ,{"id":11,"name":"Umair Khan","country":"Spain","city":"Madrid","date":"2020-04-18"}
  ];
  constructor(){
  }
   onRowClick(item){
    console.log(item)
  }
}
```
*  ```app.component.html```
```html
<div style="text-align:center">
  <ng2-paging-table (onRowClick)="onRowClick($event)" [config]="config" [dataSource]="dataSource"></ng2-paging-table>
</div>
```
# Direct API Integration?
```javascript
config:any={
    enableCheck:true,
    showLoading: true,
    paging: {perPage:[10,50,100,500]},
    enablePagingWithApi: true,
    apiSettings: {
      response:{success:Boolean,data:Array,recordsTotal:Number},
      request:"GET",  //Currently it supports get request
      url: "http:/localhost:4520/tracker/getTrackers?length=someValue&start=someValue", //complete url of API endpoint
      params: [{name:"search",value:"Happy life"}],//Mention your params this way i.e name,value
      headers: { }//put your headers here i.e Authorization etc
    },
    columns:[
      { "field": "index", "title": "Sr.N", "filter": true, "type": "number","sorting":true },
      {"field":"id","title":"ID","filter":true,"type":"string","sorting":true},
      {"field":"name","title":"Name","filter":true,"type":"string","sorting":true},
      {"field":"country","title":"Country","filter":true,"type":"string","sorting":true},
      {"field":"city","title":"City","filter":true,"type":"string","sorting":true},
      {"field":"date","title":"Date","filter":true,"type":"date",'dateFormat':'medium',"sorting":true}
     ]
  };
  
```
* Example Sample  

    ![sample image](https://raw.githubusercontent.com/yahyameo/ng2-paging-table/master/sample-example.PNG)
> Thank you, give a try. Welcome!
# What's next?
* Refresh table on insert or delete a record without reloading all data
* Pagination with direct APIs
# Contact us?
* Email: yahya_meo@yahoo.com 
* Phone: +92 322 6964686
